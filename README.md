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
npm ci
```

installieren.
Mit dem Befehl

```
npm run storybook
```

kann das Designsystem lokal gestartet werden.

Weitere Infos zum HR Designsystem und dessen Gebrauch folgen in den kommenden Wochen.
