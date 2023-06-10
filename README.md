# Web CV 2021-2022
**Author**: Damian Boquete Costa
**Last modification**: 28.04.2022

---

### Description
This is a simple WEB CV made with Python, JS, HTML & CSS (content is in french).

Here is the documentation dedicated to it, it's important to note that it is not deployed online and was not fully intended to be.

Below, you will find all the information regarding deployment.

### Installing Dependencies
The 'online' CV makes API calls implemented by a Python script using the various libraries and frameworks. Therefore, it is necessary to install item with the following command:
```
pip install -r requirements.txt
```
If pip is not installed on your machine, you can remedy this by installing it as follows:
```
sudo apt install python3-pip
``` 
It should be noted that the Python version used to create and run this project is 3.9.7.

### Execution
To be able to see the entire 'online' CV in action, you need to:
1. Open a terminal at the root of the project folder.
2. Execute the Python script to start the local server as follows:
    ```
    python3 api/api.py
    ```
3. Drag and drop the 'index.html' file into your preferred browser.