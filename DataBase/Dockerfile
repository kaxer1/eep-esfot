FROM postgres:latest

WORKDIR /var/lib/postgresql/data

COPY * .
RUN apt-get update
RUN apt-get -y install nano

EXPOSE 5432