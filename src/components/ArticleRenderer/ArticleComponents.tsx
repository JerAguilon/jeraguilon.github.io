function getComponent(component) {
    return require('components/' + component + '/' + component + '.tsx')[component];
}

export default {
    a_collection_of_whiteboard_interview_templates: {
        "CodeSnippets": getComponent('CodeSnippets'),
        "SubscribeForm": getComponent('SubscribeForm'),
    },
    ranking_interview_questions_by_cram_score: {
        "CramScore": getComponent('CramScore'),
        "SubscribeForm": getComponent('SubscribeForm'),
    },
    sales_prediction_a_deep_learning_approach: {
        "ValidationImage": require('static/img/ml/validationset.png'),
        "KaggleTaxi": require('static/img/ml/kaggle_taxi.png'),
    },
    visualizing_four_key_interview_algorithms: {
        "SubscribeForm": getComponent('SubscribeForm'),
    }
};

