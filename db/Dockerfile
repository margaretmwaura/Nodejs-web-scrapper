FROM mysql

# This is important for setting the time zone
ENV TZ=Africa/Nairobi
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3306

COPY ./dbdump.sql /docker-entrypoint-initdb.d/