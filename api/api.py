from flask_cors import CORS
from flask import Flask, jsonify, render_template

# https://programminghistorian.org/en/lessons/creating-apis-with-python-and-flask

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False

introduction = [
    {"text" : "Laissez moi commencer par me présenter brièvement. Je m'appelle Damian Boquete et je suis étudiant en informatique. Initialement issu d'une formation de commerce, je me suis rapidement reconverti dans l'informatique, premièrement, grace à l'École Superieure d'Informatique de Gestion (ESIG). <br><br>Depuis, je perfectionne mes aquis en suivant le cursus Bachelor d'informatique et systèmes de communication à la Haute École du Paysage, de l'Ingénierie et de l'Architecture de Genève (HEPIA). Je suis actuellement l'orientation logicielle offerte par ce cursus. <br><br>Le domaine informatique étant vaste, il m'est difficile de me prononcer sur une quelconque ambition d'expertise pour un sous-domaine précis. Ceci dit, je prend beaucoup de plaisir à manipuler les langages bas niveau tels que le C et l'assembleur. J'apprecie aussi Python pour tout ce qui est manipulation d'images et le traitement 'rapide' de petits problèmes pouvant facilement être automatisés."}
]


formations = [
    {
        "title" : "2020 - 2023 : HAUTE ÉCOLE DU PAYSAGE D'INGÉNIERIE ET D'ARCHITECTURE (HEPIA)",
        "text" : "Études supérieures en informatique et systèmes de communication. Future obtention du Bachelor of Science HES-SO en informatique et systèmes de communication."
    },
    {
        "title" : "2018 - 2020 : ÉCOLE SUPÉRIEURE D'INFORMATIQUE DE GESTION (ESIG)",
        "text" :  "Études orientées dans plusieurs domaines de l’informatique (conception, gestion, programmation). Obtention du diplôme d’informaticien de gestion ES avec mention."  
    },
    {
        "title" : "2013 - 2017 : ÉCOLE DE COMMERCE NICOLAS BOUVIER",
        "text" : " Études orientées dans le domaine du commerce. Obtention du CFC ainsi que la maturité professionnelle."
    }
]


experiences = [
    {
        "title" : "2020 - 2020 : AMIVIE",
        "text" : " Stage en tant que webmaster, gestionnaire de contacts et pseudo-formateur pour divers outils (kanban, interfaces infomaniak)."
    },
    {
        "title" : "2019 - 2019 : KHEOPS TECHNOLOGIES SA",
        "text" : " Moi-même ainsi que deux collèges avons été mandatés afin de réaliser une interface graphique afin de faciliter la configuration d'appareils médicaux dédiés à la collecte de données concernant des patients d'hopitaux."
    },
    {
        "title" : "2013 - 2016 : ESPACE ENTREPRISE",
        "text" : "Formation de 3 ans en parallèle avec mes études de commerce. Encourage la découverte des différents sécteurs d'une entreprise tels que l'administration, la reception, la comptabilité ainsi que le departement marketing."
    }
]


projects = [
    {
        "title" : "Simulation galaxie",
        "img" : "imgs/proj/galaxy.png",
        "text" : "Dans le cadre du cours de physique de première année à l'HEPIA, j'ai eu l'occasion implémenter une librairie dédiée à la manipulation de vecteurs.<br><br> Celle-ci à ensuite servie pour créer une simulation de mouvement d'astres autour d'une étoile. Ce projet fonctionne en C et implémente la librairie SDL."
    },
    {
        "title" : "HEPIAL Compilator",
        "img" : "imgs/proj/compilator.jpg",
        "text" : "Il m'a été possible de créer un compilateur simplifié pouvant traiter un langage fictif nommé 'hepial'. <br><br> Celui-ci est capable de gérer l'analyse lexicale, syntaxique et sémantique dans le but de générer du code bas niveau 'Jasmin'. Le projet fonctionne en Java avec Jflex et CUP."
    },
    {
        "title" : "Run Billy, Run",
        "img" : "imgs/proj/rbr_main_menu.jpg",
        "text" : "Mon projet de diplôme de fin ESIG est un petit jeu vidéo 2D. Celui-ci, très fortement inspiré d'un plombier moustachu dont je taierai le nom, fut créée a l'aide de unity et C# pour la partie technique. <br><br> Du coté des graphismes, le logiciel Asprite ainsi que ma piètre aptitude en dessin en sont les auteurs. La bande son provient de 'Eric Skiff' qui laisse en libre de droit son excellente playlist style retro."
    }
]


@app.route('/getintroduction/', methods=['GET'])
def returnIntroDatas():
    return jsonify(introduction)

@app.route('/getformations/', methods=['GET'])
def returnFormationsDatas():
    return jsonify(formations)

@app.route('/getexperiences/', methods=['GET'])
def returnExperiencesDatas():
    return jsonify(experiences)

@app.route('/getprojects/', methods=['GET'])
def returnProjectsDatas():
    return jsonify(projects)


app.run()