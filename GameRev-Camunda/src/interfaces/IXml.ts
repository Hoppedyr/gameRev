export interface IXml {
  'bpmn:definitions': {
    'bpmn:process': {
      'bpmn:startEvent': { 'bpmn:outgoing': string };
      'bpmn:exclusiveGateway': { 'bpmn:incoming': string; 'bpmn:outgoing': string[] }[];
      'bpmn:sequenceFlow': { 'bpmn:conditionExpression': string }[] | '';
      'bpmn:endEvent': { 'bpmn:incoming': Array<string> | string }[];
      'bpmn:userTask': { 'bpmn:incoming': string; 'bpmn:outgoing': string };
    };
    'bpmndi:BPMNDiagram': {
      'bpmndi:BPMNPlane': {
        'bpmndi:BPMNEdge': [[Object], [Object], [Object], [Object], [Object], [Object]];
        'bpmndi:BPMNShape': [[Object], [Object], [Object], [Object], [Object], [Object]];
      };
    };
  };
}
