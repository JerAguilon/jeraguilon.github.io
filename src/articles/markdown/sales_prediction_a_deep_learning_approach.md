<Helmet>
    <title>Jeremy Aguilon | Sales Prediction: A Deep Learning Approach</title>
    <meta name="description" content="A Kaggle competition attempt to use deep learning on sales data" />
    <meta name="keywords" content="software engineering, jeremy aguilon, sales, machine learning, AI, fastai" />
</Helmet>

# Sales Prediction: A Deep Learning Approach

#### _A Kaggle competition attempt to use deep learning on sales data_
##### 5/8/18

---

> First, a [GitHub link](https://github.com/JerAguilon/Kaggle/blob/master/competitive-data-science-predict-future-sales/predict_future_sales.ipynb)
for those who prefer reading code. I used [fastAI's library](https://github.com/fastai/fastai), which wraps
PyTorch quite nicely for this problem domain.

Given that I'm between internships, I've dedicated this lull in work towards self-learning.
Among others, Jeremy Howard's [fast.ai](https://fast.ai) deep learning lectures have been an absolute
pleasure. One topic of many that captivated me was [using deep learning for 
tabular data](http://www.fast.ai/2018/04/29/categorical-embeddings/) through embeddings. While I was aware of 
[gradient boosting](https://en.wikipedia.org/wiki/Gradient_boosting)
for these problems, Jeremy (Howard, not me) suggests that deep architectures can do the
job just as well. Before we begin, here are  some definitions.

---

<KaggleTaxi />

<small><i>The award winning architecture of 
[Kaggle's NYC Taxi Duration Competition](https://www.kaggle.com/c/nyc-taxi-trip-duration)</i></small>

---

**An embedding** is a way of representing categorical variables numerically. Categorical variables
could include non-numeric concepts like season or even low-cardinality numbers such as month.
Each category is mapped to an ID, which is associated with a vector. This isn't so different than a
[**one-hot encoding**](https://en.wikipedia.org/wiki/One-hot). These vectors are fed through
the neural network alongside all the numerical variables. The weights in these
vectors are updated as the model learns. The implication is that as the neural
net trains, elements with similar traits will have close vectors in Euclidean space.

**Tabular data** is data that you would expect in CSV format. In particular, we're focusing
on **time-series** data, which involves data points taken chronologically. For these problems,
we typically have a goal of predicting the outcome of a future date.


### Creating a Tabular Data Model: Predicting Sales

A straightforward example of learning with tabular data is sales prediction from past
months' data. Luckily, there are tons of Kaggle competitions on this, so I arbitrarily picked
[Predict Future Sales](https://www.kaggle.com/c/competitive-data-science-predict-future-sales).
It's also a worthy candidate because almost everyone else is using a gradient boosting
or similar decision tree approach. 

The goal is to predict the sales of each item that a Russian store
chain offers for the month after the test data ends. To ensure a worthy comparison between
gradient boosting and my approach, I used 
[this](https://www.kaggle.com/kcbighuge/xgboost-with-item-categories-mapped) kernel's 
as a baseline. It provides a clear benchmark: a root mean square error (RMSE) of `1.0428`.

Data engineering isn't the emphasis for this writeup. In short, we transform files like this...

---

item_categories.csv
<table class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>item_category_name</th>
      <th>item_category_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>PC - Гарнитуры/Наушники</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Аксессуары - PS2</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Аксессуары - PS3</td>
      <td>2</td>
    </tr>
  </tbody>
</table>

items.csv
<table class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>item_name</th>
      <th>item_id</th>
      <th>item_category_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>! ВО ВЛАСТИ НАВАЖДЕНИЯ (ПЛАСТ.)         D</td>
      <td>0</td>
      <td>40</td>
    </tr>
    <tr>
      <th>1</th>
      <td>!ABBYY FineReader 12 Professional Edition Full...</td>
      <td>1</td>
      <td>76</td>
    </tr>
    <tr>
      <th>2</th>
      <td>***В ЛУЧАХ СЛАВЫ   (UNV)                    D</td>
      <td>2</td>
      <td>40</td>
    </tr>
  </tbody>
</table>

shops.csv
<table class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>shop_name</th>
      <th>shop_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>!Якутск Орджоникидзе, 56 фран</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>!Якутск ТЦ "Центральный" фран</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Адыгея ТЦ "Мега"</td>
      <td>2</td>
    </tr>
  </tbody>
</table>

sales_test.csv
<table class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>date</th>
      <th>date_block_num</th>
      <th>shop_id</th>
      <th>item_id</th>
      <th>item_price</th>
      <th>item_cnt_day</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>02.01.2013</td>
      <td>0</td>
      <td>59</td>
      <td>22154</td>
      <td>999.00</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>03.01.2013</td>
      <td>0</td>
      <td>25</td>
      <td>2552</td>
      <td>899.00</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>05.01.2013</td>
      <td>0</td>
      <td>25</td>
      <td>2552</td>
      <td>899.00</td>
      <td>-1.0</td>
    </tr>
  </tbody>
</table>

test.csv
<table class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>ID</th>
      <th>shop_id</th>
      <th>item_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>5</td>
      <td>5037</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>5</td>
      <td>5320</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>5</td>
      <td>5233</td>
    </tr>
  </tbody>
</table>

---

...Into data that looks like:

<table class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>item_id</th>
      <th>shop_id</th>
      <th>date_block_num</th>
      <th>month</th>
      <th>year</th>
      <th>target</th>
      <th>target_lag_1</th>
      <th>target_lag_2</th>
      <th>target_lag_3</th>
      <th>target_lag_12</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5037</td>
      <td>5</td>
      <td>34</td>
      <td>10</td>
      <td>2</td>
      <td>0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>5320</td>
      <td>5</td>
      <td>34</td>
      <td>10</td>
      <td>2</td>
      <td>0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5233</td>
      <td>5</td>
      <td>34</td>
      <td>10</td>
      <td>2</td>
      <td>0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5232</td>
      <td>5</td>
      <td>34</td>
      <td>10</td>
      <td>2</td>
      <td>0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5268</td>
      <td>5</td>
      <td>34</td>
      <td>10</td>
      <td>2</td>
      <td>0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>

---


The general approach is to introduce _lag_ features. The `target` was how much was actually
sold in the given `date_block_num`. And the lags correspond to the `target` 1, 2, 3, and 12 months
ago for a given `(item_id, shop_id, date_block_num)` index. This allows the network
to learn how current and past months affect future trends.


Now here's the fun part. Our dataset has a mixture of continuous variables—which feed
cleanly into what we expect in a neural net—and categorical variable—which go through
the embedding matrices. This data gets fed through 2 hidden linear layers of size 1000 and 500.
Finally a sigmoid is applied on the last single-node layer. Architecturally, this is very
similar to the winning taxi ride solution above.

To reduce some overfitting problems, I introduced a substantial amount of dropout and L2 regularization. Optimizing
based on the root mean square *log* error (RMSLE) instead of the expected RMSE seemed to stabilize the loss
function more easily.

---

<ValidationImage/>

<small><i>Training the model for 3 epochs</i></small>

---

I ran this for 3 epochs, and... it worked! The RMSE on the validation set was `.9638`, and
the RMSE on the public leaderboard was `.9652`, despite some troubles with overfitting.
Not only did I outperform the original kernel's
score of `1.0428`, I placed inside the top 10% of the competition using features that
generated only top 25% percent results using gradient boosting.
_And_ I didn't spend any time engineering more features.

### Should We Always Use Deep Learning?

Although I outperformed the kernel I borrowed, there are a few tree-boosting models
that outperformed mine. So what was the cause? One [recently available kernel](https://www.kaggle.com/anqitu/feature-engineer-and-model-ensemble-top-10)
did a lot more feature engineering than I did. Which I suppose is one of the takeaways.
While deep learning increased my performance for the limited set of features I used, I spent
multiple hours tuning hyperparameters and retraining. XGBoost gave fast feedback and
was comparatively easier to configure.

In the end, the training data is just as relevant to success as the model.
There were only 212400 rows of data to train on, so adding features would have
propelled my model even further.

Is it worth the effort? In production: why not if it really helps? In a Kaggle competition: maybe if
the problem is incredibly cool and doesn't have an award of "Kudos."
