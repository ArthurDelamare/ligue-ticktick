# Ligue-ticktick

Bienvenue sur le repository de Ligue-ticktick !

L'objectif est simple : proposer une application en ligne de commandes pour extraire les tâches de TickTick et générer un affichage pour les objectifs-updates du discord de [Ligue.dev](https://ligue.dev).

## Prérequis

- Node.js >= 10
- npm >= 5
- Un compte sur [TickTick](https://ticktick.com)
- Une liste de tâches comportant les objectifs du jour

## Installation

L'installation est très simple, il suffit d'effectuer une seule commande pour avoir accès à l'application depuis n'importe quel terminal.

```bash
npm install -g ligue-ticktick
```

## Configuration

### Identifiants

Pour récupérer les tâches de TickTick, il faut pouvoir s'y connecter. C'est pourquoi vous devez renseignez vos identifiants dans un fichier **.env**. Un fichier **.env.example** existe et il suffit de le remplir puis de le renommer en **.env**.

Par défaut, le fichier est localisé ici :

- Windows : %USERPROFILE%\AppData\Roaming\npm\node_modules\ligue-ticktick
- Unix : /usr/local/lib/node_modules/ligue-ticktick

Fichier **.env.example** par défaut :

```env
TICKTICK_USERNAME=your_username
TICKTICK_PASSWORD=your_password
```

### Liste de tâches

Afin de distinguer les tâches du jour à poster sur la Ligue, il est nécessaire de posséder une Liste spécifique. Par défaut, le nom de la liste doit être Ligue mais il est possible de spécifier un autre nom via un argument.

<div align="center">
	<img width="598" height="230" src="List.PNG">
	<p>Setup nécessaire pour récupérer les tâches du jour<p>
</div>

## Utilisation

Une seule commande utilisable sur n'importe quel terminal permet de récupérer vos objectifs du jour. Il ne restera qu'à copier le contenu puis coller dans le salon #objectifs-updates.

Deux arguments existent :

- **--list** ou **-l** suivi du nom de la liste (Ligue par défaut)
- **--todo** ou **-t** suivi de l'emoji souhaité devant les objectifs (:construction: par défaut)

Commande de base :

```bash
ligue-ticktick get-goals
```

Avec liste spécifique (dans cet exemple, **Work**) :

```bash
ligue-ticktick get-goals --list Work
```

Avec un emoji différent :

```bash
ligue-ticktick get-goals --todo :gear:
```

## A venir

Par la suite, la possibilité de récupérer toutes les tâches datées à aujourd'hui sera possible (plutôt qu'isoler les tâches dans une Liste).

Aussi, une commande pour créer un rapport des tâches effectuées ce mois sera bientôt disponible (toutes les tâches terminées en 30 jours).
