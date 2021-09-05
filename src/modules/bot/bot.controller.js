/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-case-declarations */
/* eslint-disable global-require */
/* eslint-disable no-console */
import question1 from '../../../src/helpers/Questions/question1.json';
import question2 from '../../../src/helpers/Questions/question2.json';
import question3 from '../../../src/helpers/Questions/question3.json';
import question4 from '../../../src/helpers/Questions/question4.json';
import { createNewUser } from './bot.helpers';
import { API } from '../../helpers/axios';
import { State } from '../../helpers/state';

const { getStep, setStep } = State;

const botMessage = async (req, res) => {
  const step = await getStep('step');

  switch (Number(step)) {
  case 1:
    res.status(200).send(question1);
    createNewUser({ userId: req.body.user_id, userName: req.body.user_name });
    break;
  case 2:
    res.payload.blocks = question2;
    res.payload.text = '';
    API(res.payload);
    break;
  case 3:
    res.payload.blocks = question3;
    res.payload.text = '';
    API(res.payload);
    break;
  case 4:
    res.payload.blocks = question4;
    res.payload.text = '';
    API(res.payload);
    break;
  case 5:
    res.payload.text = 'thank you';
    API(res.payload);
    setStep(1);
    break;
  default:
  }
  
};

export default botMessage;
