# HR Designsystem

## Installation

Das Designsystem ist mit Node.js LTS Version 16.14.2 gebaut. Vor der Installation daher bitte Node.js und NPM
auf die folgenden Versionen aktualisieren.

| Werkzeug | Version |
| -------- | ------- |
| Node.js  | 20.11.1 |
| NPM      | 10.2.4  |

---

**Hinweis**

Node.js installiert man am besten mit dem Node Version Manager NVM. Dies ist zwar eigentlich ein Linux Projekt, kann aber als nvm-windows auch unter Windows genutzt werden. Die Installationsdateien können unter https://github.com/coreybutler/nvm-windows/releases heruntergeladen werden. NVM gestattet es je nach Bedarf schnell über die Konsole zwischen mehreren Versionen von node.js zu wechseln. Seit der Version 1.18 von NVM müssen zur korrekten Nutzung die Hinweise unter https://github.com/coreybutler/nvm-windows/wiki/Common-Issues#permissions-exit-1-exit-5-access-denied-exit-145 beachtet werden.

Die zu verwendende Node.js Version ist auch in der Date .nvmrc festgehalten. Sofern nvm genutzt wird um Node.js zu installieren, sorgt dieses Datei dafür, dass automatisch, wenn in das Verzeichnis dieses Projekts gewechselt wird, die korrekte Node.js Version für dieses Projekt geladen wird. Mehr dazu unter https://github.com/nvm-sh/nvm?tab=readme-ov-file#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file

Damit das ganze auf Windows Rechnern funktioniert, müssen zuvor noch ein paar Anpassungen an der Command Shell gemacht werden. Für git bash müssen dazu in der Datei .bashrc (diese liegt direkt im Benutzerverzeichnis des aktiven Nutzers) folgende Anpassungen gemacht werden. Ans Ende der Datei bitte folgenden Code einfügen:

```
# Traverse up in directory tree to find containing folder
nvm_find_up() {
  local path_
  path_="${PWD}"
  while [ "${path_}" != "" ] && [ ! -f "${path_}/${1-}" ]; do
    path_=${path_%/*}
  done
  nvm_echo "${path_}"
}

nvm_find_nvmrc() {
  local dir
  dir="$(nvm_find_up '.nvmrc')"
  if [ -e "${dir}/.nvmrc" ]; then
    nvm_echo "${dir}/.nvmrc"
  fi
}

load-nvmrc() {
  local node_version="$(node.exe -v)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ ! -z "$nvmrc_path" ]; then
    local nvmrc_node_version=$(cat "${nvmrc_path}")
  fi

  local target_version="${nvmrc_node_version:-v16.14.2}"

  if [ "$target_version" != "$node_version" ]; then
    echo "Switch node from $node_version to $target_version"
    nvm use $target_version
  else
    echo "node in use $target_version"
  fi
}

# create a PROPMT_COMMAND equivalent to store chpwd functions
typeset -g CHPWD_COMMAND="load-nvmrc"

_chpwd_hook() {
  shopt -s nullglob

  local f

  # run commands in CHPWD_COMMAND variable on dir change
  if [[ "$PREVPWD" != "$PWD" ]]; then
    local IFS=$';'
    for f in $CHPWD_COMMAND; do
      "$f"
    done
    unset IFS
  fi
  # refresh last working dir record
  export PREVPWD="$PWD"
}

# add `;` after _chpwd_hook if PROMPT_COMMAND is not empty
PROMPT_COMMAND="_chpwd_hook${PROMPT_COMMAND:+;$PROMPT_COMMAND}"

```
---

Zur Verwaltung der Node Packages des Design Systems verwenden wir statt npm den Paketmanager [yarn](https://classic.yarnpkg.com/en/).
Dieser verwendet einen anderen Algorithmus zur Auflösung der Abhängigkeiten der einzelnen Node Packages und hat
sich insbesondere beim Update von Storybook als die verlässlichere Alternative erwiesen. Um yarn nutzen zu können, muss es zunächst mit dem
Befehl

```
npm install --global yarn
```

installiert werden.

Zur Installation des Designsystems bitte anschließend das Projekt in ein beliebiges Verzeichnis auf der Festplatte mit

```
git clone https://github.com/mumprod/hr-design-system-handlebars.git
```

klonen. Im Anschluss daran in das Installationsverzeichnis wechseln und alle notwendigen
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

Test
