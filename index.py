import os
import random

# 图片所在目录
ls = 'image'

# 循环列出目录下file名称
for (root, dirs, files) in os.walk(ls):
    # print(files)

    # 循环列出目录下文件数序号
    num = [x+1 for x in range(0, len(files))]

    # 定义了个接口用来获取总数（从1开始）
    # def lens():
    #     print(len(files))
    #     print(num)

    # 把序号列表和目录列表合并成字典
    dictST = dict(zip(num, files))
    # print(dictST)

    # 竖着打印字典
    # for i in dictST.items():
    #     print(i)

    # 获取一个随机数，大于等于1，小于最大序号
    number0 = random.randint(1, len(files))
    # print('当前是第 %s 张图片'% number0)
    # print('它的地址在↓')

    # 定义了第二个接口用来返回随机图片的地址
    def answer():
        number1 = dictST.get(number0)
        print('image\%s' % number1)