ARG ELASTIC_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION}

# https://www.cloudbees.com/blog/understanding-dockers-cmd-and-entrypoint-instructions
# https://devtron.ai/blog/cmd-and-entrypoint-differences/

ENTRYPOINT ["/entrypoint.sh"]
