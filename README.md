# FS Java Angular Project

## Tech stack
- **Front**: angular
- **Back**: java, spring, postgresql, hibernate, flyway.
- **Auth**: Keycloak
- **Monitoring**: prometheus & grafana
- **Logging**: ELK
- **Pipeline**: Jenkins


## Getting started

install java 21, maven 3.6.9+: 
- 

```bash

sudo apt install openjdk-21-jdk -y
sudo apt install maven

java -version
mvn -version

sudo update-alternatives --config java

```
- configure java sdk, maven (restart project)
- run main java file


## Programme
**voir Java + Spring / Angular code (structure fichier, code, ...).
**essayer de comprendre ce qui a été fait dans le code (front + back).

**** clean code, principes solid, design pattern ****
**** Terraform, ansible, docker, keycloak, sonarqube, kubernetes ****
**** Monitoring & Logging ****

**implement keycloak oauth2.0 => java/angular full stack (authentification + authorisation).
**dockerize app (front + back).
**create a pipeline ci/cd => Jenkins.
**provision & configure infrastructure => aws (terraform + ansible + aws).
**manage a cluster in kubernetes.

NB:
voir les points clés de angular, java, spring => theorie + pratique.
(how to level up) => voir discuter avec java angualr dev senior linkedin








## Keycloak gettings started

- create a new realm
- create a new client:
    - fill the form (keep data in mind)
    - select the default flow
    - http://localhost:8081 => origin, root, home, ...
- create a role:
- create a user
    - fill the form + set a password
    - set a role to each user

get all realm settings:
`http://localhost:8180/realms/my-realm-master/.well-known/`

- to get a token response:
    - call this url => `http://localhost:8180/realms/my-realm/protocol/openid-connect/token`
    - fill with form-encoded `grant_type=password&username=sam&client_id=my-realm-master&password=password`

- export data from a keycloak (all data related to a realm)
    - connec to keycloak container
    - go to `/opt/keycloak/bin`
    - execute this `kc.sh export --optimized --file=fs-java-angular-app --realm=my-realm` (specify file name, the realm to export)

kc.sh export --optimized --file=fs-java-angular-app --realm=my-realm

** config openid:**
http://localhost:8180/realms/master/.well-known/openid-configuration => master realm
http://localhost:8180/realms/my-realm/.well-known/openid-configuration => my realm	
http://localhost:8180/realms/my-realm/protocol/openid-connect/token => my realm	

** getting started: **
- go to http://localhost:8180
- connect to master realm
- then connect/create to another realm


** configuration keycloak: **
- create a new realm,
- create a new client, (app ex: angular)
- create a new role,
- create a new user + assign a role