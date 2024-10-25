# FS Java Angular Project

## Tech stack

- **Front**: Angular
- **Back**: Java, Spring, Postgresql, hibernate, flyway.
- **Auth**: Keycloak
- **Monitoring**: Prometheus & Grafana
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

## documentation (Swagger API):

we are using swagger API:

- access swagger doc => `http://localhost:8080/swagger-ui/index.html`

## add flyway: to handle our migrations

- `mkdir -p db/migration` => contains all migration files
- file format => `VXXX___description.sql`
- add conf => `application.yml`
- add dependencies => `pom.xml`

## add monitoring => java app **java melody**

- add dependency
- add conf => application.yml
- access monitoring => `http://localhost:8080/monitoring`
- doc => `https://github.com/javamelody/javamelody/wiki/SpringBootStarter`

## Keycloak gettings started

- **Realms**: Isolated environments within Keycloak for managing users and configurations.
- **Clients**: Applications or services that request authentication from Keycloak.
- **Groups**: Collections of users managed as a single unit.
- **Users**: Individuals who can authenticate within a realm.
- **Roles**: Sets of permissions assigned to users, groups, or clients.
- **Client Scopes**: Define the permissions and information a client can request.
- **Sessions**: Authenticated sessions between users or clients and Keycloak.
- **Events**: Logged actions and occurrences for auditing and monitoring.

- create a new realm
- create a new client:
  - fill the form (keep data in mind)
  - select the default flow
  - http://localhost:8081 => origin, root, home, ...
- create a role:
- create a user
  - fill the form + set a password
  - set a role to each user

get realm configuration:
`http://localhost:8180/realms/my-realm/.well-known/openid-configuration`

- to get a token response:

  - call this url => `http://localhost:8180/realms/my-realm/protocol/openid-connect/token`
  - fill with form-encoded `grant_type=password&username=sam&client_id=my-realm-front&password=password`

- export data from a keycloak (all data related to a realm)
  - connec to keycloak container
  - go to `/opt/keycloak/bin`
  - execute this `kc.sh export --optimized --file=fs-java-angular-app --realm=my-realm` (specify file name, the realm to export)

`kc.sh export --optimized --file=fs-java-angular-app --realm=my-realm`

** config openid:**

- `http://localhost:8180/realms/master/.well-known/openid-configuration`=> master realm
- `http://localhost:8180/realms/my-realm/.well-known/openid-configuration` => my realm
- `http://localhost:8180/realms/my-realm/protocol/openid-connect/token` => my realm

**export keyclock config:**
docker compose exec keycloak /bin/bash

- `/opt/keycloak/bin/kcadm.sh config credentials --server http://localhost:8081/auth --realm master --user admin --password admin`
  Logging into `http://localhost:8081/auth` as user admin of realm
  master

**NB:**
Pour tester keycloak:
`docker compose up --build`

## Docker:

both front & back are dockerized app, docker image is optimized.

## Relationships

There are examples for all relationships in this projects, with their migrations (flyway) written in sql:

- **one-To-one**:
- **one-To-many**:
- **many-To-many**:

## Jenkins

- est un outil qui permet d'automatisé l'integration continue et la livraison continue en utilisant des pipelines
- jenkins surveille un depot github ou autres des un evenement: push, pull_request, commit, survient il declanche la pipeline.
- jenkins utilise un ensemble de plugins gratuits qui lui permet notament de gartir une compatibilité avec d'autre techno: docker, maven, kubernetes, ...
- **pros**:
  - ameliore la collaboration.
  - automatise le processus d'integration et de livraison.
  - ameliore la qualité de code.
  - large communauté.
  - compatibilité avec d'autre techno (plugins).
  - open source.
  - compatibilité multi environnements: windows, linux, mac.
- **cons**:
  - interface utilisateur: moins intuitive, vieillotte.
  - compléxité de configuration: comparé a des outils plus recents.
  - maintenance: etant auto-heberger jenkins necessite d'etre maintenant.
  - gestion de plugins: la mise a jour des plugins peut casser la configuration.

**Getting started**

Using docker

- `docker compose -f jenkins.yml up --build`
- mount a volume in local fodler "jenkins_data"

- allows jenkins user + allows permission:

```bash
sudo chmod -R 775 ./volumes/jenkins_data
sudo chown -R 1000:1000 ./volumes/jenkins_data
```

- go to `http://localhost:8081/`, enter a password given in shell.
- install plugins, create a user account

- configuration url => `http://localhost:8081/jenkins`
- credentials username/password: `jenkins`/`jenkins`

**Pipelines**

- **Freestyle pipeline**:
  - projets simples, tâches basiques
  - facile à configurer,
  - peu flexible
  - non versionné

- **Single pipeline**:
  - projets complexes, pipelines CI/CD avancés,
  - tres flexibles, versionné,
  - courbe d'apprentissage, maintenance

- **Multibranch pipeline**:
  - ideal dans les projets avec plusieurs branches et environnements (dev, test, stagging, production, ...)
  - automatiser des pipeline CI/CD independant par branche
  - necessite plus ressources, complexe a configurer.

**getting started Jenkins**:
**credentials**:
- create a new token to access github => `github settings/developer settings/personal access tokens/token` click generate new token.
- create a new token to access docker hub => `account settings/security/personal access token/` click generate new token.

**docker hub**
add docker hub credentials => jenkins

**github**
add github credentials (repository access, ...) => jenkins


**webhooks**:
create a webhook to trigger jenkins execution on push event:

- go to `settings/webhooks` add webhook
- url: `http://localhost:8080/github-webhook`, content-type: `application/json`, event: `push`

doc => `https://medium.com/@lilnya79/integrating-github-with-jenkins-using-tokens-and-credentials-8352e216a1b5#:~:text=Go%20to%20your%20GitHub%20account,repo%20access%20for%20private%20repositories`

**install docker inside docker container**

or follow this tutorial:
`https://hub.docker.com/r/getintodevops/jenkins-withdocker/tags`

- install jenkins localy:
  `https://medium.com/cloud-native-daily/setting-up-a-ci-cd-pipeline-process-with-jenkins-and-docker-in-aws-130a5e03192a`

- freestyle pipeline
  `https://harsh05.medium.com/ci-cd-pipelines-with-jenkins-and-docker-a-beginners-project-journey-e817f97747e6`
- multibranch pipeline

## Monitoring

For testing purposes prometheus & grafana:
`docker compose -f monitoring.yml up --build`

<!-- 

## Monitoring
For testing purposes prometheus & grafana:
`docker compose -f monitoring.yml up --build`

## Logging
For testing purposes ELK ():
`docker compose -f elk.yml up --build` -->

## TODO

* fix jenkins bug on pipeline CI
* add jenkins pipeline CD

* finir monitoring => prometheus & grafana 

* fix spring app dockerized version

* add logging => ELK


* infra => terraform, ansible, kube (do it nodejs) => aws / gcp ?

* Mongodb example => spring

<!-- NB:
voir les points clés de angular, java, spring => theorie + pratique.
(how to level up) => voir discuter avec java angular dev senior linkedin -->
