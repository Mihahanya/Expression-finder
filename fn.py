from exp_gen import *

def to_expr(i: int, sm: list[str]) -> str:
    res = ""
    n = len(sm)
    while True:
        res = sm[i % n] + res
        i //= n
        if i < n: break
    return sm[i] + res


def check_brc(expr):
    brc_open, brc_cls = '(', ')'
    stack = []
    for i in range(len(expr)):
        if expr[i] == brc_open: stack.append(i)
        elif expr[i] == brc_cls:
            if len(stack) == 0: return False

            if expr[stack[-1]] == brc_open:
                if i - stack[-1] == 1: return False
                stack = stack[:-1]
            else: return False
    return not stack


def is_correct_expr(expr: str):
    for i in range(1, len(expr)):
        if mfn.count(expr[i-1]) != 0 and mfn.count(expr[i]) != 0:
            return False

    for m in mfn:
        if (expr[0] != '-' and expr.find(m) == 0) or expr.rfind(m) == len(expr)-1: return False

    return check_brc(expr)
