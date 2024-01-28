# Scrapy 相关

![](https://ai-inter1.com/wp-content/uploads/2021/07/Scrapy-Logo-big.png)

Scrapy 是一个 Python 的爬虫框架

https://www.bilibili.com/video/BV1Db4y1m7Ho/?p=92&vd_source=8960252a3845b76b699282b11f36ab5c

## 项目构建

### 下载安装

```shell
# python -m venv .venv
# source .venv/bin/active
pip install scrapy        # [!code focus]
```

---

### 项目创建

- <Badge>写法一</Badge>

::: code-group

```shell [命令]
scrapy startproject [项目名]
```

```shell [目录结构]
[项目名]/
|- [项目名]/
    |- spiders/
        |- __init__.py
        |- ...
    |- __init__.py
    |- items.py
    |- middleware.py
    |- pipeline.py
    |- settings.py
|- scrapy.cfg
```

:::

- <Badge>写法二</Badge>

::: code-group

```shell [命令]
cd 现存目录
scrapy startproject [应用名] .    # [!code focus]
```

```shell [目录结构]
[项目名]/
|- [应用名]/
    |- spiders/
        |- __init__.py
        |- ...
    |- __init__.py
    |- items.py
    |- middleware.py
    |- pipeline.py
    |- settings.py
|- scrapy.cfg
```

:::

---

### 创建爬虫

需要在项目中的`spiders`目录下执行命令在`spiders`目录下生成同名的爬虫文件

::: code-group

```shell [命令]
cd spiders目录
scrapy genspider [爬虫的名字] [要爬取的网页]    # [!code focus]
```

```shell [目录结构]
my_spider_app/
|- spiders
    |- __init__.py
    |- 生成的爬虫文件.py
|- ...
```

```py [生成的文件]
import scrapy


class BaiduSpider(scrapy.Spider):
    name = "爬虫的名字"                      # 爬虫的名字 ( 执行爬虫时使用 )
    allowed_domains = ["要爬取的网页"]       # 允许访问的域名
    start_urls = ["https://要爬取的网页"]    # 起始 URL 地址 ( 第一次要访问的域名 )

    def parse(self, response):
        # print(response.text)  # 文本
        # print(response.body)  # 二进制
        pass
```

:::

::: details 例子：验证创建爬取 baidu 的爬虫

::: code-group

```shell [命令]
(.venv) % cd my_spider_app/spiders
(.venv) % scrapy genspider baidu www.baidu.com
```

```shell [目录结构]
my_spider_app/
|- spiders
    |- __init__.py
    |- baidu.py
|- ...
```

```py [生成的文件]
import scrapy


class BaiduSpider(scrapy.Spider):
    name = "baidu"
    allowed_domains = ["www.baidu.com"]
    start_urls = ["https://www.baidu.com"]

    def parse(self, response):
        pass
```

:::

---

### 运行爬虫

```shell
scrapy crawl [爬虫的名字]
```

在无法爬取的数据时关闭配置文件`settings.py`中的对 robots 协议的遵守

```py
# Obey robots.txt rules
ROBOTSTXT_OBEY = True    # [!code --]
ROBOTSTXT_OBEY = False   # [!code ++]
```
