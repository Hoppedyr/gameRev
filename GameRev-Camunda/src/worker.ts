import fs from 'fs';
import path from 'path';
import { Client, logger, Variables } from 'camunda-external-task-client-js';
import fetch from 'node-fetch';
import { CAMUNDA_URL } from './constants';

const config = { baseUrl: CAMUNDA_URL, use: logger, asyncResponseTimeout: 10000 };

const client = new Client(config);

const profanityWords = fs.readFileSync(path.join(__dirname, '..', 'bad-words.txt'), 'utf-8').split('|');

// console.log(profanityWords);

client.subscribe('check-profanity', async function ({ task, taskService }) {
  // Put your business logic here

  try {
    const vars = await task.variables.getAll();
    const review: string = await vars.review;
    let hasProfanity: boolean = false;

    console.log('checking for profanity');

    const checkProfanity = (profanity, text) => {
      return new RegExp(`(${profanity})`, 'gi').test(text);
    };

    for (let i = 0; i < profanityWords.length; i++) {
      if (checkProfanity(profanityWords[i], review)) {
        hasProfanity = true;
        break;
      }
    }

    console.log(vars);

    const processVariables = new Variables().setAll(vars).set('hasProfanity', hasProfanity).set('approved', false);
    // Complete the task
    // complete the task

    await taskService.complete(task, processVariables);
  } catch (e) {
    console.error(`Failed completing my task, ${e}`);
  }
});

client.subscribe('approved-review', function ({ task, taskService }) {
  // Put your business logic here

  try {
    const vars = task.variables.getAll();

    // Send a request to the database
    fetch(`http://localhost:8080/api/v1/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_id: vars.game_id,
        userName: vars.userName,
        country: vars.country,
        ratingScore: vars.ratingScore,
        review: vars.review,
      }),
    })
      .then((e) => {
        console.log(e);
        console.log(`saving id2: ${task.processInstanceId} with review ${vars.review}, to database`);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        try {
          taskService.complete(task);
        } catch (e) {
          console.error(`Failed completing my task, ${e}`);
        }
      });
  } catch (e) {
    console.log(e);
  }
});
