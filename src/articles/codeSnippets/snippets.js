/** Terrible ES5 hack :( Needed due to building issues
 * since ES6 strings aren't supported using my build config.
 *
 * Source: https://eli.thegreenplace.net/2013/11/09/javascript-es-5-hack-for-clean-multi-line-strings
 */
const MultiString = function(f) {
  return f.toString().split('\n').slice(1, -1).join('\n');
}

const slidingWindow = MultiString(function() {/**
def slidingWindow(string, charSet):
    # Step 1 and 2
    left = 0
    right = 0
    bestScore = float('inf')

    # Step 3a:  Generally, for sliding window, you often need a set or hashmap to track
    #           the characters/values you have in your substring/subarray
    # Step 3b: This is an auxiliary value that lets us look up the sum
    #           of all the values in the hashmap quickly without iterating over it.
    letterMap = {}
    charactersEncountered = 0;

    # Step 4
    while right < len(string):
        curr_right = string[right]

        # Step 5
        if curr_right in charSet:
            letterMap[curr_right] =  letterMap.get(curr_right, 0) + 1
            if letterMap[curr_right] == 1:
                charactersEncountered += 1
        right += 1

        # Step 6: If you have a new candidate substring (in this case we found all
        #    our letters, begin incrementing left until it is *invalid*
        if (charactersEncountered == len(charSet)):
            while (charactersEncountered == len(charSet)):
                curr_left = string[left]
                if curr_left in charSet:
                    letterMap[string[left]] -= 1
                    if letterMap[string[left]] == 0:
                        charactersEncountered -= 1
                    left += 1
            # Step 7: Finally! Update the best score if we have a new best.
            #    This new candidate substring is bounded by right - left + 1. Avoid
            #    off-by-one's by drawing an example out.
            bestScore = min(bestScore, right - left + 1)
    return bestScore
**/});

const treeRecursion = MultiString(function() {/**
# step 1
def inplace_sum_helper(root):
    # Step 2. In an interview, I always comment this to be explicit:
    # Base cases:
    if root is None:
        return 0
    # Step 3. Once again, I always comment this:
    # Recursive calls:
    left_solution = inplace_sum_helper(root.left)
    right_solution = inplace_sum_helper(root.right)

    # Step 4. Do something with these values!
    tmp = root.val # we need this later :)
    root.val = left_solution + right_solution
    # Step 5
    return tmp + left_solution + right_solution

def inplace_sum(root):
    return inplace_sum_helper(root)
**/});


const dynamicProgramming = MultiString(function() {/**
# step 1
def num_ways(arr, current_index, f, b, jumps_left, cache):
    int n = len(arr)

    # Step 2. In an interview, I always comment this to be explicit:
    # Base cases:
    if current_index == n - 1: # we're at the end!
        return 1
    if current_index < 0 or current_index >= n: # Jack fell off the array :(
        return 0
    if jumps_left == 0: # Jack is out of moves :(
        return 0

    # Step 2b. Really the only addition to our recursive recipe
    if (current_index, jumps_left) in cache:
        return cache[current_index]

    # Step 3. Once again, I always comment this:
    # Recursive calls:
    back_solution = num_ways_helper(arr, current_index - b, f, b, jumps_left - 1, cache)
    forward_solution = num_ways_helper(arr, current_index + f, f, b, jumps_left - 1, cache)

    # Step 4. Remember to cache things for the future
    solution = back_solution + forward_solution
    cache[ (current_index, jumps_left) ] = solution
    return solution

def num_ways(arr, f, b, max_jumps):
    return num_ways_helper(arr, f, b, {})
**/});


export default { slidingWindow, treeRecursion, dynamicProgramming };
