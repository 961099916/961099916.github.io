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
    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol="000001", period="daily", start_date="20170301", end_date='20210907', adjust="")
    print(stock_zh_a_hist_df)
