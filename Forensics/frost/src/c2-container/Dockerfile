FROM python:3.11-alpine

RUN echo "YXBrIHVwZGF0ZSAmJiBhcGsgYWRkIGdpdCAmJiBwaXAgaW5zdGFsbCBweWNyeXB0b2RvbWU=" | base64 -d | sh

COPY socat /bin/socat
COPY pydoc /bin/pydoc
COPY pytest /bin/pytest

RUN rm -rf /bin/pydoc

EXPOSE 3000

CMD ["/bin/socat", "TCP-LISTEN:3000,fork,reuseaddr"]
