from math import sqrt
from fn import *

#find = 3.14159265
find = 4
#find = 7
acc = 0.005
expr_len = 8

nms = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
mfn = ['+', '-', '*', '/', '%']
fnc = ['sqrt']
use_brc = True
fll = nms + mfn + fnc + ['(', ')']*use_brc

if __name__ == "__main__":
    ress = []
    it = len(fll)**expr_len
    for i in range(len(fll)**5, it):
        expr = to_expr(i, fll)
        try:
            if not is_correct_expr(expr): continue

            res = eval(expr)
            if abs(find-res) <= acc:
                ress.append([expr, res])
                print(i, '/', it, ress)

        except:
            #print('err', expr)
            #exit(0)
            pass

        if i % 3000 == 0: print(i, '/', it, ress)

    print('search depth:', it)
    print(sorted(ress, key=lambda x: abs(find-x[1])))
    print('count of results:', len(ress))
