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

def check_nums(expr):
    num = ''
    for i, t in enumerate(expr):
        if t.isdigit() and i < len(expr)-1:
            num += t
        elif len(num) > 0:
            if i == len(expr)-1: num += t
            if num[0] == '0' and len(num) > 1: return False
            else: num = ''
    return True


def is_correct_expr(expr: str):
    if expr.find('/0') != -1: return False

    for i in range(1, len(expr)):
        if mfn.count(expr[i-1]) != 0 and mfn.count(expr[i]) != 0:
            return False

    for m in mfn:
        if (expr[0] != '-' and expr.find(m) == 0) or expr.rfind(m) == len(expr)-1: return False

    return check_brc(expr) and check_nums(expr)
