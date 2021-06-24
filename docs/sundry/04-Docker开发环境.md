# Docker 开发环境

```shell
sudo docker run --restart=unless-stopped -d -p 3306:3306 --name common-mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7 --lower_case_table_names=1
sudo docker run --restart=unless-stopped -d -p 6379:6379 --name common-redis redis
sudo docker run --restart=unless-stopped -d -p 27017:27017 --name common-mongo mongo
sudo docker run --restart=unless-stopped -d --name common-es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.3.2
sudo docker run --restart=unless-stopped -d --name common-mq -p 5672:5672 -p 15672:15672 -v `pwd`/data:/var/lib/rabbitmq --hostname myRabbit -e RABBITMQ_DEFAULT_VHOST=/  -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin rabbitmq:3.7.7-management
sudo docker run --name sentinel -d -p 8858:8858 -d bladex/sentinel-dashboard    
sudo docker run --name emq -p 18083:18083 -p 1883:1883 -p 8084:8084 -p 8883:8883 -p 8083:8083 -d registry.cn-hangzhou.aliyuncs.com/synbop/emqttd:2.3.6

```