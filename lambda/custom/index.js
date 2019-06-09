    /* eslint-disable  func-names */
    /* eslint-disable  no-console */
     
    const Alexa = require('ask-sdk-core');
     
    const LaunchRequestHandler = {
      canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
      },
      handle(handlerInput) {
        const speechText = 'Welcome to the Plan My Trip Skill, you can say Help me plan my Trip!';
     
        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard('Plan My Trip', speechText)
          .getResponse();
      },
    };
     
    const PlanMyTripIntentHandler = {
      canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'PlanMyTrip';
      },
      handle(handlerInput) {
        const currentIntent = handlerInput.requestEnvelope.request.intent;
     
        if (handlerInput.requestEnvelope.request.dialogState === 'COMPLETED') {
     
          let speechOutput = "Your itenary is ";
          const fromCity = currentIntent.slots.fromCity.value;
          const toCity = currentIntent.slots.toCity.value;
          const travelDate = currentIntent.slots.travelDate.value;
          speechOutput += " from " + fromCity + " to " + toCity + " on " + travelDate;
     
          return handlerInput.responseBuilder
            .speak(speechOutput)
            .withSimpleCard('Plan my Trip', speechOutput)
            .getResponse();
     
        }
        else {
          return handlerInput.responseBuilder
          .addDelegateDirective()
          .getResponse();
        }
     
      },
    };
     
    const HelpIntentHandler = {
      canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
      },
      handle(handlerInput) {
        const speechText = 'You can say plan my trip';
     
        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard('Plan My Trip', speechText)
          .getResponse();
      },
    };
     
    const CancelAndStopIntentHandler = {
      canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
      },
      handle(handlerInput) {
        const speechText = 'Goodbye!';
     
        return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Plan My Trip', speechText)
          .getResponse();
      },
    };
     
    const SessionEndedRequestHandler = {
      canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
      },
      handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
     
        return handlerInput.responseBuilder.getResponse();
      },
    };
     
    const ErrorHandler = {
      canHandle() {
        return true;
      },
      handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
     
        return handlerInput.responseBuilder
          .speak('Sorry, I can\'t understand the command. Please say again.')
          .reprompt('Sorry, I can\'t understand the command. Please say again.')
          .getResponse();
      },
    };
     
    const skillBuilder = Alexa.SkillBuilders.custom();
     
    exports.handler = skillBuilder
      .addRequestHandlers(
        LaunchRequestHandler,
        PlanMyTripIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
      )
      .addErrorHandlers(ErrorHandler)
      .lambda();