# HR Designsystem

## Installation

Das Designsystem ist mit Node.js LTS Version 16.14.2 gebaut. Vor der Installation daher bitte Node.js und NPM
auf die folgenden Versionen aktualisieren.

| Werkzeug | Version |
| -------- | ------- |
| Node.js  | 16.14.2 |
| NPM      | 8.5.0   |

---

**Hinweis**

Node.js installiert man am besten mit dem Node Version Manager NVM. Dies ist zwar eigentlich ein Linux Projekt, kann aber als nvm-windows auch unter Windows genutzt werden. Die Installationsdateien können unter https://github.com/coreybutler/nvm-windows/releases heruntergeladen werden. NVM gestattet es je nach Bedarf schnell über die Konsole zwischen mehreren Versionen von node.js zu wechseln. Seit der Version 1.18 von NVM müssen zur korrekten Nutzung die Hinweise unter https://github.com/coreybutler/nvm-windows/wiki/Common-Issues#permissions-exit-1-exit-5-access-denied-exit-145 beachtet werden.

---

Zur Installation des Designsystems bitte zunächst das Projekt in ein beliebiges Verzeichnis auf der Festplatte mit

```
git clone https://github.com/mumprod/hr-design-system-handlebars.git
```

klonen. Danach in das Installationsverzeichnis wechseln und alle notwendigen
npm Pakete mit dem Befehl

```
yarn
```

installieren.
Mit dem Befehl

```
yarn storybook
```

kann das Designsystem lokal gestartet werden. Damit dieses immer mit den aktuellsten Daten arbeitet, muss in einem weiteren Terminalfenster zudem das Skript `optimize-assets` mit dem Befehl

```
yarn optimize-assets
```

gestartet werden. Dieses Skript erzeugt für die einzelnen Features JSON-Testdaten, optimiert im SVG-Format vorliegende Icons, erzeugt eine angepasste Version von Modernizr.js und stellt alle Handelbars-Templates als JS-Exporte zur Verfügung. Es läuft im Watch-Modus,
sodass Dateiänderungen automatisch erkannt und die entsprechenden Optimierungs-Operationen neu ausgeführt werden.
Beim ersten Aufruf des Skripts cached es die Rohdaten der jeweiligen Assets im Verzeichnis `build/gulp/cache`. Bei allen zukünftigen Aufrufen vergleicht es die Rohdaten mit den Daten im Cache und führt die Optimierungen lediglich noch für geänderte Dateien aus. Dies verkürzt zukünftige Builds erheblich.

## Einrichten eines VS-Code Makros zur komfortableren Ausführung der Skripte

Die NPM-Skripte `storybook` und `optimize-assets` müssen für die korrekte Funktionsweise von Storybook immer zusammen ausgeführt werden. Zur Zeitersparnis und
weil insbesondere der Aufruf des Skripts `optimize-assets` gerne mal vergessen wird, erlaubt es der Code Editor VS-Code zum gemeinsamen Starten der Skripte
ein Makro zu erstellen. Damit VS-Code Makros ausführen kann, muss das Add-On [Macro-Commander](https://marketplace.visualstudio.com/items?itemName=jeff-hykin.macro-commander) installiert werden. Zur Einrichtung des eigentlichen Makros, müsssen an zwei Dateien Änderungen vorgenommen werden.
Zunächst muss der Code des Makros in den benutzerspezifischen Einstellungen (`Strg + Shift + P` > "User Settings (JSON)") eingetragen werden.

```json
settings.json
{
    // Weitere benutzerspezifische Einstellungen
    ...
    "macros": {
        "start_storybook_scripts": [
            "workbench.action.terminal.killAll",
            "workbench.action.terminal.new",
            "workbench.action.terminal.split",
            "workbench.action.terminal.focusPreviousPane",
            {
                "command": "workbench.action.terminal.sendSequence",
                "args": { "text": "yarn storybook\r" }
            },
            "workbench.action.terminal.focusNextPane",
            {
                "command": "workbench.action.terminal.sendSequence",
                "args": { "text": "yarn optimize-assets\r" }
            }
        ]
    }
}
```

Im Anschluss daran muss, um das Makro aufrufen zu können, eine Tastenkombination mit dem Makro verknüpft werden. Hierfür muss in der
benutzerspezifischen Datei `keybindings.json` (`Strg + Shift + P` > Open Keyboard Shortcuts (JSON)) eine Tastenkombination zugeordet
werden.

```json
[
    {
        "key": "ctrl+shift+9",
        "command": "macros.start_storybook_scripts"
    }
]
```

Als `key` kann eine beliebige Tastenkombination festgelegt werden. Um einzusehen welche Tastenkombinationen gegegebenenfalls schon in
Verwendung sind, empfiehlt es sich unter `Datei>Einstellungen>Tastenkombinationen` die derzeitigen Tastenzuordnungen in VS-Code einzusehen.
Ist dem Makro eine Tastenkombination zugeordnet, kann es, wenn alles korrekt gemacht wurde, ausgeführt werden. Folgende `Kommandos` führt das
Makro hintereinander aus:

1. Beenden aller derzeit geöffneten Terminal Instanzen
2. Öffnen eines neuen Terminal Fensters
3. Teilen des Terminal Fensters
4. Setze den Fokus auf das linke Terminal Fenster
5. Setze den Befehl `yarn storybook` ab und führe ihn aus
6. Setze den Fokus auf das rechte Terminal Fenster
7. Setze den Befehl `yarn optimize-assets` ab und führe ihn aus

Weitere Details und Grundlagen zum Gebrauch des Designsystems können direkt in dessen Dokumentation eingesehen werden.
