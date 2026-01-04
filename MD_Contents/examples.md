# Esempi di Markdown

Questo documento mostra tutti i tipi di contenuto Markdown supportati.

## Heading Levels

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Testo Formattato

Questo è **testo in grassetto** e questo è *testo in corsivo*.

Puoi anche usare ***testo in grassetto e corsivo***.

Questo è ~~testo barrato~~.

## Liste

### Lista Non Ordinata

- Primo elemento
- Secondo elemento
  - Sotto-elemento 1
  - Sotto-elemento 2
- Terzo elemento

### Lista Ordinata

1. Primo elemento
2. Secondo elemento
3. Terzo elemento

### Task List

- [x] Task completata
- [ ] Task da fare
- [ ] Altra task

## Code Blocks

### JavaScript

```javascript
const greeting = 'Hello, World!';
console.log(greeting);

function add(a, b) {
  return a + b;
}

const result = add(5, 3);
console.log(result); // 8
```

### Python

```python
def greet(name):
    print(f"Hello, {name}!")

greet("World")

# List comprehension
numbers = [x * 2 for x in range(10)]
print(numbers)
```

### HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a paragraph.</p>
</body>
</html>
```

### CSS

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
```

## Tabelle

### Tabella Semplice

| Nome | Età | Città |
|------|-----|-------|
| Mario | 30 | Roma |
| Luigi | 25 | Milano |
| Anna | 28 | Napoli |

### Tabella con Allineamento

| Left | Center | Right |
|:-----|:------:|------:|
| A | B | C |
| D | E | F |
| G | H | I |

### Tabella Complessa

| Funzionalità | Stato | Priorità | Note |
|--------------|-------|----------|------|
| Hot Reload | ✅ Implementato | Alta | Funziona perfettamente |
| Syntax Highlighting | ✅ Implementato | Alta | Supporta molti linguaggi |
| Tabelle | ✅ Implementato | Media | Stile professionale |
| Formattazione | ✅ Implementato | Media | Font e dimensione |
| Ricerca | 🔄 In sviluppo | Bassa | Prossima feature |

## Link

Questo è un [link a Google](https://www.google.com).

Link con titolo: [Next.js Documentation](https://nextjs.org/docs "Documentazione ufficiale Next.js")

## Immagini

![Alt text](https://via.placeholder.com/400x200 "Titolo immagine")

## Blockquote

> Questo è un blockquote.
> Può contenere più righe.
> 
> E anche paragrafi separati.

## Inline Code

Usa `console.log()` per stampare in console.

Il comando `npm install` installa le dipendenze.

## Separatori

---

## Liste Miste

1. Primo elemento
   - Sotto-elemento A
   - Sotto-elemento B
2. Secondo elemento
   - Sotto-elemento C

## Codice con Output

```bash
npm install
npm run dev
```

Output atteso:
```
> md-to-www@1.0.0 dev
> next dev

  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
```

## Note Finali

Questo documento mostra tutte le funzionalità Markdown supportate dal sistema. Prova a modificare questo file e vedrai le modifiche in tempo reale grazie all'hot reload!

