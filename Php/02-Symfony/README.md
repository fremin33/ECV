# Todolist 

[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/602f1de424d245b18884f6127dc3083d)](https://www.codacy.com/app/codacy_alexandre-mace/to_do_list?utm_source=github.com&utm_medium=referral&utm_content=alexandre-mace/to_do_list&utm_campaign=Badge_Coverage)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bd270da39df74f74b455d7f96b9ef66c)](https://app.codacy.com/app/codacy_alexandre-mace/to_do_list?utm_source=github.com&utm_medium=referral&utm_content=alexandre-mace/to_do_list&utm_campaign=Badge_Grade_Settings)

Todolist made with Symfony 3.4 
## Features
* Drag & Drop task priorities
* Autocomplete user name on task adding + adding a new one if not exists

## Requirements 
*   [MySQL](https://www.mysql.com/fr/)
*   [PHP](http://php.net/manual/fr/intro-whatis.php)
*   [Apache](https://www.apache.org/)

## Installation 
*   Clone the repository and open it.

		$ git clone https://github.com/alexandre-mace/oc_p8.git
		$ cd oc_p8

*   Install dependencies.
		
		$ composer install

## Configuration
*   Customize the app/config/parameters.yml file

```
parameters:
    database_host: 127.0.0.1
    database_port: ~
    database_name: symfony
    database_user: root
    database_password: ~
```

*   Create database 

		$ php bin/console doctrine:database:create

*   Get tables 

		$ php bin/console doctrine:schema:update --force


## Tests
*   run this command in console  and results will show up in console

		$ php vendor/bin/simple-phpunit
		
## Run a web server

* Run this command and go to the address indicated in the console (e.g http://localhost:8000/)
       
        $ php bin/console server:run
                
        