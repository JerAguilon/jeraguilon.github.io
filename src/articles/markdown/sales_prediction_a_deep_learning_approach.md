<Helmet>
    <title>Jeremy Aguilon | Sales Prediction: A Deep Learning Approach</title>
    <meta name="description" content="A Kaggle competition attempt to use deep learning on sales data" />
    <meta name="keywords" content="software engineering, jeremy aguilon, sales, machine learning, AI, fastai" />
</Helmet>

# Sales Prediction: A Deep Learning Approach

#### _A Kaggle competition attempt to use deep learning on sales data_
##### 5/8/18

---

> First, a [GitHub link](https://github.com/JerAguilon/Kaggle/blob/master/competitive-data-science-predict-future-sales/predict_future_sales.ipynb) for those who prefer reading code.

Given that I'm between internships, I've dedicated this lull in work to self learning.
Among others, Jeremy Howard's [fast.ai](https://fast.ai) deep learning lectures have been an absolute
pleasure. One topic of many that captivated me was [using deep learning for 
tabular data](http://www.fast.ai/2018/04/29/categorical-embeddings/) through embeddings. While I was aware of 
[gradient boosting](https://en.wikipedia.org/wiki/Gradient_boosting)
for these problems, Jeremy (Howard, not me) suggests that deep architectures can do the
job just as well. Before we begin, here are  some definitions.

**An embedding** is a way of representing categorical variables numerically. Categorical variables
could include non-numeric concepts like season or even low-cardinality numbers such as month.
Unlike [one-hot encoding](https://en.wikipedia.org/wiki/One-hot), we associate
each category with a vector rather than a single number. The implicatoin is that as the neural
net trains, elements with similar traits will have close vectors in euclidean space.

**Tabular data** is data that you would expect in CSV format. In particular, we're focusing
on **time-series** data. [TODO]



### Creating a Tabular Data Model: Predicting Sales

A straightforward example of learning with tabular data is sales prediction from past
months' data. Luckily, there are tons of Kaggle competitions on this, so I arbitarily picked
[Predict Future Sales](https://www.kaggle.com/c/competitive-data-science-predict-future-sales).
It's also a worthy candidate because almost everyone else is using a gradient boosting
approach. 

The goal of this competition is to predict the sales of each item that a Russian store
chain offers for the month after the test data ends. To ensure a worthy comparison between
gradient boosting and my approach, I used 
[this](https://www.kaggle.com/kcbighuge/xgboost-with-item-categories-mapped) kernel's 
data engineering approach. It turns data that looks like this:

Into data that looks like:

[TODO]

The geneneral approach is to introduce _lag_ features. The `target` was how much was actually
sold in the given `date_block_num`. And the lags correspond to the `target` 1, 2, 3, and 12 months
ago for a given `(item_id, shop_id, date_block_num)` index.

The kernel I used also sets a clear benchmark: a root mean square error of `1.0428`.

Now here's the fun part. Our dataset has a mixture of continuous variables--which feed
cleanly into what we expect in a neura net--and categorical variables--which go through
the embedding matrices. This data gets fed through 2 hidden layers. To reduce some overfitting
problems I had, I introduced a substantial amount of dropout and L2 regularizatoin.

---

<ValidationImage/>

<small><i>Training the model for 3 epochs</i></small>

---

I ran this for 3 epochs, and... it worked! My RMSE on the validation set was `.9638`, and
RMSE on the public leaderboard was `.9652`, despite some troubles with overfitting.
Not only did I outperform the original kernel's
score of `1.0428`, I placed inside the top 10% of the competition using features that
generated top 25% percent results using gradient boosting.
_And_ I really didn't spend any time doing my own feature engineering.

### Should We Always Use Deep Learning?

Although I outperformed the kernel I borrowed, there are a few tree boosting models
that outperformed mine. So what was the cause? One [recently available kernel](https://www.kaggle.com/anqitu/feature-engineer-and-model-ensemble-top-10)
did a lot more feature engineering than I did. Which I suppose is one of the takeaways.
While deep learning is a neat trick that appeared to increase my performance, I spent
multiple hours training and tuning hyperparameters.  XGBoost gave fast feedback and
was comparatively easier to configure.

In the end, the data you feed to your architecture is just as crucial to the success
of a model. There were only 212400 rows of data to train on, so adding features would have
propelled my model even further. Is it worth the effort? In production--why not if it really helps?
In a Kaggle competition--maybe if the problem is incredibly cool.
