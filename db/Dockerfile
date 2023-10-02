FROM mysql

# This is important for setting the time zone
ENV TZ=Africa/Nairobi
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3306

COPY ./dbdump.sql /docker-entrypoint-initdb.d/
# COPY ./init.sh /docker-entrypoint-initdb.d/

# pass variable PG_TABLE to script.sh to replace ${PG_TABLE} with .env variable in seed.sql

# https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
# Explore the above backup function for the db