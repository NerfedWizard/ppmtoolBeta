echo "Switching to main branch"
git checkout main
echo "Pulling latest changes"
git pull
echo "Installing dependencies"
mvn clean install
echo "Building project"
mvn clean package
echo "Deploying project"
scp -r src/main/resource/* loel@172.233.212.30
scp loel@172.233.212.30:/var/www/172.233.212.30/applications.properties loel@172.233.212.30:/ppmtoolBeta/src/main/resources/
java -Dserver.port=$PORT $JAVA_OPTS -jar target/PPMTool-0.0.1-SNAPSHOT.jar