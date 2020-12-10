import fs from 'fs';
import path from 'path';
import { Client, logger, Variables } from 'camunda-external-task-client-js';

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

const client = new Client(config);

const profanityWords = fs.readFileSync(path.join(__dirname, '..', 'bad-words.txt'), 'utf-8').split('|');

// console.log(profanityWords);

client.subscribe('check-profanity', async function ({ task, taskService }) {
  // Put your business logic here

  const vars = await task.variables.getAll();
  const review: string = await vars.review;
  let hasProfanity: boolean = false;

  for (let i = 0; i < profanityWords.length; i++) {
    const word = profanityWords[i];
    if (new RegExp(`(${word})`, 'gi').test(word)) {
      hasProfanity = true;
      break;
    }
  }

  const processVariables = new Variables().set('review', review).set('hasProfanity', hasProfanity);
  // Complete the task
  // complete the task

  try {
    await taskService.complete(task, processVariables);
  } catch (e) {
    console.error(`Failed completing my task, ${e}`);
  }
});

client.subscribe('approved-review', async function ({ task, taskService }) {
  // Put your business logic here

  const vars = await task.variables.getAll();
  const review: string = await vars.review;
  // Send a request to the database

  console.log(`saving id: ${task.processInstanceId} with review ${review}, to database`);

  try {
    await taskService.complete(task);
  } catch (e) {
    console.error(`Failed completing my task, ${e}`);
  }
});
