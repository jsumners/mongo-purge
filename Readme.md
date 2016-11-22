# mongo-purge

*mongo-purge* is a CLI utility for purging documents from a MongoDB collection.
It is intended to be used in cron jobs to keep collections of temporary documents
clean of stale documents.

Example:

```bash
$ mongo-purge --uri mongodb://mongo.example.com/the_db \
  --collection a_collection \
  --credentials ./creds.json \
  --older-than $(date -v-5M +'%Y-%m-%dT%H:%M:%SZ')
STATUS: ok: yes, deleted: 10
$ # documents created prior to 5 minutes ago have been removed, total: 10 documents
```

Currently, the only supported purge method is to purge documents older
than a specified date and time.

## Install

`npm install -g mongo-purge`

## Usage

*mongo-purge* requires the following parameters to be used:

+ `--uri <string>`: a fully qualified URI to a MongoDB database.
+ `--collection <string>`: the name of the collection within the database to target
+ `--older-than <string>`: an ISO-8601 format date and time to use as the cutoff,
  e.g. '2016-11-22T14:00:00Z'

Optionally, the following parameter can also be supplied:

+ `--credentials <string>`: a path to a JSON document containing the credentials
  to the database. A credentials document looks like:

  ```json
  {
    "username": "a-user",
    "password": "his-password"
  }
  ```

  Clearly, this document should have appropriate permissions set; typically `0640`.

## License

[MIT License](http://jsumners.mit-license.org/)