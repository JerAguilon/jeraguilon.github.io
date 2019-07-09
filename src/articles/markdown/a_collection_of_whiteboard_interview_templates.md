Like I said in a [_Visualizing Four Key Interview Algorithms_](/blog/visualizing_four_key_interview_algorithms),
most technical interviews really belong in a small bucket of algorithms. Lately, I've taken the time to
coach a few engineers. Despite their knowledge of these algorithms, they often find that implementing on a white 
board is (a) intimidating and (b) difficult to prepare for. Only when they finally pick up a recipe
on how to generally implement these algorithms do they shine.

And so, in my effort to "open-source" interviewing techniques, I'm here to share my mental recipes 
and code templates for a few common categories: tree recursion, dynamic programming,
and sliding windows. Hopefully these are even more accessible and easy to reflect on
than the slideshow. While I discourage memorizing most things, knowing these recipes
will smoothen out your interviewing because you won't need to worry about the skeleton
structure anymore. You can just think about the hard bits!

Although I contextualize the algorithms with an example prompt, I encourage you to
think about how you can apply these templates onto other interview questions.

# Basic Tree Recursion

Consider the following interview question:
`Given the root of a binary tree that stores ints, convert the tree in-place
 such that each nodes  stores the sum of all the elements in its left and right subtree.`
 ([GeeksforGeeks link](https://www.geeksforgeeks.org/convert-a-given-tree-to-sum-tree/))

Here's my recipe:

1. Create a helper function for your recursion. Why not use the main function?
   In some cases, you may want to add extra parameters in the recursive stack.
   Always making a helper will save you this headache.
2. The biggest tip I tell people I coach is to solve for the _easiest_ possible cases.
   Quite often, this is simply a null node! You can always add extra base cases if needed.
3. "Imagine" you have a magic function that you can pass the left and right subtree to.
   It will (as in, it better!) return the exact values you need to solve for the current node.
   Most magical of all, this is the exact function you're writing right now.
    * _Extra hint: In this case, it should return the sum of all elements of the subtree you pass to it._
4. Do the relevant operation for the current node.
5. Return something useful for the parent node.

Lots of people have trouble trusting this process, but the key is really in the base case.
If you wrote code that consistently reaches the base case and you return out a useful value
for the parent node, you can fully trust recursion.

In Python:

<CodeSnippets algorithm="treeRecursion"/>

Super short and simple. In fact, most tree recursion is simply a DFS with a few extra lines
catered towards your problem.

______

<SubscribeForm />

______

# Dynamic Programming

Consider the following interview question: `Jack is hopping backwards and forwards
in an array of size n. He starts in cell 0 and can hop f cells forwards or b
cells backwards. He is allowed to jump up to max_jumps times.
How many ways can he reach the last cell and finish the game?`

First, why do we even need DP? By definition of a tree, if you do a recursive traversal,
you'll never recursively call on a node you have visited before. However, some recursive
solutions _do_ allow this to happen. If you could save the solution the first time you
hit a "node," you would save a lot of computational time.

The people I coach are often intimidated by this prompt, but I'm here to show you that
if you've got the hang of recursion, you can actually write a DP solution using
almost the exact same template as above! People often demo DP using a multi-dimensional array,
but for many it's simpler to use a recursive technique called _memoization_, where you
cache spots Jack has been before.

Here's my template. Hopefully this sounds familiar to above:

1. Create a helper function for your recursion. It should take all the arguments in the main method
   plus a dictionary/map. This is memoization.
2. Once again, solve for the easiest cases. What if jack is at the end? What if he is out of moves?
   What if he fell off the array?
    * **The only difference in DP**: What if Jack was already here? What if at some point,
       you solved for Jack being in this cell `i` with `n` moves left? Assuming that we have
       our memoized cache, we can just return the solution very quickly.
3. Call the magic function on two branches: Jack jumping backwards and Jack jumping forwards. Also,
   decrement the number of moves he has left.
4. Solve based on the recursive return values (and store in the cache!!!) and return.

In Python:

<CodeSnippets algorithm="dynamicProgramming"/>

Why do I prefer teaching DP recursively? I find that this framework is way more consistent
since it is simply a recursive solution made more efficient by a hash map and a couple
lines to read/write into it.

# Sliding Window

Consider the following interview question:
`Given a string and a set of characters, return the length of the **smallest** substring that
contains all of the characters in the set.` ([GeeksforGeeks link](https://www.geeksforgeeks.org/find-the-smallest-window-in-a-string-containing-all-characters-of-another-string/))

To solve this, you once again need to recognize this as a sliding window problem!
The signs are complex to write in words, so view
my [visualizations](/blog/visualizing_four_key_interview_algorithms) to learn how.

Now that you recognize this problem, we need to know how to solve it. Here's the 
high-level recipe:

1. Create two pointers, a left (slow) and a right (fast)
2. Create a "best score found so far." If you're minimizing, make this a big value. If you're maximizing, make it a small value.
3. Create your supporting data structures to track when you've found a valid substring.
4. Create a `while right < len(input_string)`. Note that you may need extra conditionals to handle edge cases for when
   `right` is at the end, but you stil have a candidate substring to process. See the code below for this.
     5. **If you do not have a candidate substring**: increment `right` and update your data structure.
     6. **If you do have a candidate substring**: increment `left` to chop of unecessary letters while 
        updating your data structure.
     7. Update your best score if you now have a smaller string than those found previously.

This is by far the trickiest one to remember. But if you read over this guide _and_ solve
a few problems yourself, you'll find that it becomes quite easy to re-implement. Once again in Python:

<CodeSnippets algorithm="slidingWindow"/>
