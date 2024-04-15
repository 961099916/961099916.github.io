#!/usr/bin/env python
# -*- coding:utf-8 -*-
# 导入 requests 包
import requests
import datetime
import os
import akshare as ak




def download_date(date):
    print(date)


if __name__ == '__main__':
    stock_path=os.getcwd()+'/src/.vuepress/public/stock'
    date=datetime.datetime.now()
    step=datetime.timedelta(days=1)
    print(date.strftime('%Y-%m-%d'))
    date=date-step
    print(date.strftime('%Y-%m-%d'))
    print('bg.svg' not in os.listdir(stock_path))
    download_date(date)
    stock_zt_pool_em_df = ak.stock_zt_pool_em(date='20240415')
    print(stock_zt_pool_em_df)
