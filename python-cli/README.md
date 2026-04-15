# Terminal Stocks CLI (Python)

简洁的命令行股价查询工具，基于 [terminal-stocks](https://github.com/shweshi/terminal-stocks) web API。

## 安装

```bash
# 下载或克隆
git clone https://github.com/Xpe935/terminal-stocks.git
cd terminal-stocks/python-cli

# 添加到 PATH
echo 'export PATH="$PATH:$(pwd)"' >> ~/.bashrc
source ~/.bashrc
```

## 使用

```bash
# 单股票
stock MSFT

# 多股票
stock MSFT,AAPL,NVDA,GOOGL
```

## 输出示例

```
$ stock MSFT,AAPL,NVDA
代码                 价格        涨跌        涨跌幅  日内区间
-------------------------------------------------------
Microsoft         $393.11     $8.74 (    2.27)  $386.52 - $394.69
Apple            $258.83    -$0.37 (   -0.14)  $257.19 - $261.93
NVIDIA           $196.51     $7.20 (    3.80)  $190.80 - $196.51
📈 Apr 14, 2026
```

## 依赖

- Python 3 (stdlib)
- 网络访问 terminal-stocks.dev

## 数据

- 数据来源：Yahoo Finance (延迟 15 分钟)
- 无需 API key

## 原创作者

- [shweshi/terminal-stocks](https://github.com/shweshi/terminal-stocks) - 原始 NPM/Node.js 版本

## License

MIT License - 见根目录 LICENSE 文件
