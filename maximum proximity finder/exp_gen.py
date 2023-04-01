from math import sqrt
from fn import *

#find = 3.14159265
find = 1.414213
#find = 7
acc = 0.005
expr_len = (3, 10)

nms = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
#nms = ['2']
mfn = ['+', '-', '*', '/']
fnc = ['sqrt(']
brc = ['(', ')']
use_brc = True
fll = nms + mfn + fnc + brc*use_brc

if __name__ == "__main__":
    ress = []
    fr, to = len(fll)**expr_len[0], len(fll)**expr_len[1]
    for i in range(fr, to):
        expr = to_expr(i, fll)
        try:
            if not is_correct_expr(expr): continue

            res = eval(expr)
            if abs(find-res) <= acc:
                ress.append([expr, res])
                print(i, '/', to-fr, ress)

        except:
            #print('err', expr)
            #exit(0)
            pass

        if i % 3000 == 0: print(i-fr, '/', to-fr, ress)

    print('search depth:', to-fr, f'from {fr}, to {to}')
    print(sorted(ress, key=lambda x: abs(find-x[1])))
    print('count of results:', len(ress))
