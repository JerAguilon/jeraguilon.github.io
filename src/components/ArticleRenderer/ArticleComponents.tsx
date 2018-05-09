import { CramScore } from 'components/CramScore';

// Images: TODO: refactor this into a nice factory
const ValidationImage = require('static/img/ml/validationset.png');
const KaggleTaxi = require('static/img/ml/kaggle_taxi.png');

export default {
    ranking_interview_questions_by_cram_score: {
        "CramScore": CramScore,
    },
    sales_prediction_a_deep_learning_approach: {
        "ValidationImage": ValidationImage,
        "KaggleTaxi": KaggleTaxi
    }
};

