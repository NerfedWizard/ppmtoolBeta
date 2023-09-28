echo "Switching to main branch"
git checkout main
echo "Pulling latest changes"
git pull
echo "Installing dependencies"
mvn clean install
echo "Building project"
mvn clean package
echo "Deploying project"
java -Dserver.port=$PORT $JAVA_OPTS -jar target/PPMTool-0.0.1-SNAPSHOT.jar