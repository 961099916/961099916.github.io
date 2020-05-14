# Docker 开发环境

```shell
sudo docker run -d -p 3306:3306 --name common-mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7
sudo docker run -d -p 6379:6379 --name common-redis redis
sudo docker run -d -p 27017:27017 --name common-mongo mongo
sudo docker run -d --name common-es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.3.2
sudo docker run -d --name common-mq -p 5672:5672 -p 15672:15672 -v `pwd`/data:/var/lib/rabbitmq --hostname myRabbit -e RABBITMQ_DEFAULT_VHOST=/  -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin rabbitmq:3.7.7-management

```