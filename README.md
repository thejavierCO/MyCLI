## Creacion de un cli para administrar proyectos

  PT --help // ver todos los comandos
  
  PT --new // crear nuevo proyecto
    PT --new -type TEXT //Espesifica el tipo de proyecto
      PT --new -type TEXT -name TEXT //Espesifica el typo y el nombre
      
  PT --del // eliminar el proyecto
    PT --del -type TEXT //Espesifica el tipo de proyecto
      PT --del -type TEXT -name TEXT //Espesifica el typo y el nombre
  
  PT --open // abrir el proyecto
    PT --open -type TEXT //Espesifica el tipo de proyecto
      PT --open -type TEXT -name TEXT //Espesifica el typo y el nombre
  
  PT --add // agregar nuevos modulos si se usa nodejs en el proyecto
    PT --add -type TEXT //Espesifica el tipo de proyecto
      PT --add -type TEXT -name TEXT //Espesifica el typo y el nombre
