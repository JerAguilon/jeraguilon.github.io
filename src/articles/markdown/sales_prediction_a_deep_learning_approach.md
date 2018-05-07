<Helmet>
    <title>Jeremy Aguilon | Sales Prediction: A Deep Learning Approach</title>
    <meta name="description" content="A Kaggle competition attempt to use deep learning on sales data" />
    <meta name="keywords" content="software engineering, jeremy aguilon, sales, machine learning, AI, fastai" />
</Helmet>

# Sales Prediction: A Deep Learning Approach

#### _A Kaggle competition attempt to use deep learning on sales data_
##### 5/8/18

---

First, a [_GitHub link_](https://github.com/JerAguilon/Kaggle/blob/master/competitive-data-science-predict-future-sales/predict_future_sales.ipynb) for those who prefer reading code.

Given that I'm between internships, I've dedicated this lull in work to self learning.
Among others, Jeremy Howard's [fast.ai](https://fast.ai) deep learning lectures have been an absolute
pleasure. One topic of many that captivated me was [using deep learning for 
tabular data](http://www.fast.ai/2018/04/29/categorical-embeddings/) through embeddings. While I was aware of 
[gradient boosting](https://en.wikipedia.org/wiki/Gradient_boosting)
for these problems, Jeremy (Howard, not me) suggests that deep architectures can do the
job just as well.

A straightforward example of learning with tabular data is sales prediction from past
months' data. Luckily, there are tons of Kaggle competitions on this, so I arbitarily picked
[Predict Future Sales](https://www.kaggle.com/c/competitive-data-science-predict-future-sales).
It's also a worthy candidate because almost everyone else is using a gradient boosting
approach. My success criteria was to match their performances without
doing any extra feature engineering.

The goal of this competition is to predict the sales of each item that a Russian store
chain offers for the month after the test data ends. The data looks like:

[TODO]

Clearly, merging this data is necessary. Using some rudimentary feature engineering,
We can combine these datasets and `item_cnt_day` fields

Now here's the fun part. The fastai library provides an easy-to-use wrapper for
PyTorch. Overall, the architecture looks like this:

[TODO]

I ran this for 3 epochs, and... it worked! My RMSE score on the public leaderboard ended up being .96521,
placing me well among all the folks using boosting trees.

I suspect that had I tuned my hyperparameters to reduce overfitting or shifted
efforts to my own novel feature engineering, I could improve this score
quite a bit. But I set a goal of validating this methodology, and I got what I wanted.

For a more technical insight, I found it fascinating peering into what the embeddings are doing. For example,
consider this principle component analysis on 3000 random samples from the dataset.
