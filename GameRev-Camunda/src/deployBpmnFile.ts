import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { IDeploymentResponse } from './interfaces/IResponse';
import { CAMUNDA_PROCESS_NAME, CAMUNDA_URL, DEPLOY_AFTER_MILLISECONDS } from './constants';

// **********************  start process instance  ************************ /;
const deployBPMN = () => {
  const bpmnFilePath = path.join(__dirname, '..', 'gameRev.bpmn');
  var formdata = new FormData();
  formdata.append('deployment-name', CAMUNDA_PROCESS_NAME);
  formdata.append('enable-duplicate-filtering', 'false');
  formdata.append('deploy-changed-only', 'true');
  formdata.append('gameRev.bpmn', fs.createReadStream(bpmnFilePath), 'gameRev.bpmn');
  var requestOptions = {
    method: 'POST',
    body: formdata as any,
    // redirect: 'follow',
  };
  fetch(`${CAMUNDA_URL}/deployment/create`, requestOptions)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result: IDeploymentResponse) => {
      startBpmnProcess(result.id);
    })
    .catch((error) => console.log('error', error));
};

// **********************  start process instance  ************************ /;
const startBpmnProcess = (id: string) => {
  fetch(`${CAMUNDA_URL}/process-definition/${id}/start`, { method: 'POST' })
    .then((r) => console.log('process has started'))
    .catch((error) => console.error(error));
};

setTimeout(function () {
  deployBPMN();
}, DEPLOY_AFTER_MILLISECONDS);
