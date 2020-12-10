# BPMN Assignment

### Prerequesits

- Docker

### Usage

- open 3 terminals
- Run `npm i`
- Run `npm run start:camunda` in one terminal
- Install, open Camunda modeler and deploy the bpmn file in the root folder
- Run `npm run start:listener` in the second terminal
- Run `node processStarter.js <review>`

if you type the word "shit" inside the review, then the admin are supposed to approve the review before it get "saved" into the database. If it does not contain profanity more explicitly the "shit" word, then the review should not require an approval before being saved.

If a shit word was provided. Go to the following page http://localhost:8080/camunda/app/tasklist/ and review the input that was saved. click approve and save and see your shit inside the listener terminal.

Congratz it work.

### Context

Where does this come to context with our exam project?
Our exam project is about games and game reviews, so when a user tries to make a review for a game this process will be triggered and the admin will be looking at the review.

The integration has not yet been integrated into the main project which is the exam project.
