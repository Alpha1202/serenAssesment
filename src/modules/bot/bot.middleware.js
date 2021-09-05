/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { updateUser } from './bot.helpers';
import { State } from '../../helpers/state';

const { getStep, setStep } = State;

const userScheduleObj = {
  userId: '',
  userScheduleOne: {
    day: '',
    time: '',
  },
  userScheduleTwo: {
    day: '',
    time: '',
  },
};

const userHobbiesObj = {
  userId: '',
  userHobbies: {
    type: [],
  },
};
const userThreeDigitsObj = {
  userId: '',
  firstThreeDigits: '',
};

export const handleSteps = async (req, res, next) => {
  const moodBtnArray = ['for_mood1', 'for_mood2', 'for_mood3'];
  const step = await getStep('step');

  // if step is empty, set it to 1
  if (!step) {
    setStep(1);
  }
  res.payload = {};

  if (req.body.payload) {
    res.status(200).send('ok');
    const params = JSON.parse(req.body.payload);
    // process answer to question 1 and then increment step to 2 and then update the database
    if (Number(step) === 1 && moodBtnArray.includes(params.actions[0].action_id)) {
      await setStep(2);
      const payload = {
        userId: params.user.id,
        userMood: params.actions[0].value,
      };
      await updateUser(payload);
    }
    // process answer to question 2
    // and populate the userScheduleObj object declared in the global scope
    if (Number(step) === 2 && params.actions[0].action_id === 'static_select-action') {
      userScheduleObj.userId = params.user.id;
      if (params.actions[0].placeholder.text === 'Select time (first choice)') {
        userScheduleObj.userScheduleOne.time = params.actions[0].selected_option.value;
      }
      if (params.actions[0].placeholder.text === 'Select day (first choice)') {
        userScheduleObj.userScheduleOne.day = params.actions[0].selected_option.value;
      }
      if (
        params.actions[0].placeholder.text === 'Select time (second choice)'
      ) {
        userScheduleObj.userScheduleTwo.time = params.actions[0].selected_option.value;
      }
      if (params.actions[0].placeholder.text === 'Select day (second choice)') {
        userScheduleObj.userScheduleTwo.day = params.actions[0].selected_option.value;
      }

      return;
    }
    //  process answer to question 2 and then update the database and increment step to 3
    if (Number(step) === 2 && params.actions[0].action_id === '3') {
      for (const [, value] of Object.entries(userScheduleObj.userScheduleOne)) {
        if (value === '') {
          return;
        }
      }
      for (const [, value] of Object.entries(userScheduleObj.userScheduleTwo)) {
        if (value === '') {
          return;
        }
      }
      await updateUser(userScheduleObj);
      setStep(3);
    }

    // process answer to question 3
    // and populate the userHobbiesObj object declared in the global scope
    if (Number(step) === 3 && params.actions[0].action_id === 'actionId-0') {
      userHobbiesObj.userId = params.user.id;
      for (const item of params.actions[0].selected_options) {
        userHobbiesObj.userHobbies.type.push(

          { name: item.value }
        );
      }
      return;
    }

    //  process answer to question 3 and then update the database and increment step to 4
    if (Number(step) === 3 && params.actions[0].action_id === '4') {
      if (userHobbiesObj.userHobbies.type.length < 1) return;
      await updateUser(userHobbiesObj);
      setStep(4);
    }

    // process answer to question 4
    // and populate the userThreeDigitsObj object declared in the global scope
    if (Number(step) === 4 && params.actions[0].action_id === 'three_digits') {
      if (params.actions[0].value.length !== 3) {
        return;
      }
      userThreeDigitsObj.userId = params.user.id;
      userThreeDigitsObj.firstThreeDigits = params.actions[0].value;
      return;
    }

    //  process answer to question 4 and then update the database and increment step to 5
    if (Number(step) === 4 && params.actions[0].action_id === '5') {
      if (!userThreeDigitsObj.firstThreeDigits) return;
      await updateUser(userThreeDigitsObj);
      setStep(5);
    }

    res.params = params;
    res.payload.channel = params.channel.id;

    res.payload.user = params.user.id;
  }
  return next();
};
