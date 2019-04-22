const slidingWindow = 
`def slidingWindow(string, char_set):
    # Step 1 and 2
    left = 0
    right = 0
    best_score = float('inf')
    # Step 3a:  Generally, for sliding window, you often need a set or hashmap to track
    #           the characters/values you have in your substring/subarray
    # Step 3b: This is an auxiliary value that lets us cleanly look up the characters
    #          in char_set that we have found
    letter_map = {} # maps from character to number of occurences in the substring
    characters_encountered = 0 # when this is equal to len(char_set), we have a
                              # candidate substring

    # Step 4
    while right < len(string):
        curr_right = string[right]

        # Step 5
        if curr_right in char_set:
            letter_map[curr_right] =  letter_map.get(curr_right, 0) + 1
            if letter_map[curr_right] == 1:
                characters_encountered += 1
        right += 1

        # Step 6: If you have a new candidate substring (in this case we found all
        #    our letters, begin incrementing left until it is *invalid*
        if (characters_encountered == len(char_set)):
            while characters_encountered == len(char_set):
                curr_left = string[left]
                if curr_left in char_set:
                    letter_map[curr_left] -= 1
                    if letter_map[curr_left] == 0:
                        characters_encountered -= 1
                left += 1
            # Step 7: Finally! Update the best score if we have a new best.
            #    This new candidate substring is bounded by right - left + 1. Avoid
            #    off-by-one's by drawing an example out.
            best_score = min(best_score, right - left + 1)
    return best_score`;

const treeRecursion =
`# step 1
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
    return inplace_sum_helper(root)`;


const dynamicProgramming = 
`# step 1
def num_ways_helper(arr, current_index, jumps_left, f, b, cache):
    n = len(arr)

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
        return cache[(current_index, jumps_left)]

    # Step 3. Once again, I always comment this:
    # Recursive calls:
    back_solution = num_ways_helper(arr, current_index - b, jumps_left - 1, f, b, cache)
    forward_solution = num_ways_helper(arr, current_index + f, jumps_left - 1, f, b, cache)

    # Step 4. Remember to cache things for the future
    solution = back_solution + forward_solution
    cache[ (current_index, jumps_left) ] = solution
    return solution

def num_ways(arr, f, b, max_jumps):
    return num_ways_helper(arr, 0, max_jumps, f, b, {})`

export default { slidingWindow, treeRecursion, dynamicProgramming };
