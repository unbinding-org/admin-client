@context
  type:       rdf:type
  label:      rdfs:label
  prefLabel:  rdfs:prefLabel
  comment:    rdfs:comment
  word:       unb:word
  see:        unb:seeWord
  definition: unb:definition (sameAs: rdfs:comment)

@id:        unb-dh39dj29dj392j
type:       word
label:      dhammina
see:        unb-92hd92k2duj238

@id:        unb-92hd92k2duj238
type:       word
label:      dhamma
definition: a definition string from one of the sc pali dictionaries

@id:        unb-2sjdjdk291j192
type:       concept
label:      dhamma
prefLabel:  Dhamma (Teaching of the Buddha)

@id:        unb-8fj29sj2937h27
type:       concept
label:      dhamma
prefLabel:  Dhamma (Law of Nature)


for properties that have a range of rdfs:Literal, save :
  spo
  pso

spo::unb-92hd92k2duj238::definition::__rdfs:Literal__
pso::definition::unb-92hd92k2duj238::__rdfs:Literal__

---

TODO

[Aldo Gangemi's Ontology design presentation](https://pdfs.semanticscholar.org/28b8/5dc9eb6f2323a9d6334f4b6e5ecfe856e218.pdf)

---

TODO

[an OWL meta-model for collaborative ontology design](http://ceur-ws.org/Vol-273/paper_38.pdf)


---

## Ontology based Qualitative Case Studies

Notes from [Dong Han and Kilian Stoffel's paper](https://pdfs.semanticscholar.org/0ffc/41bb8e06faee4ed49f0b4b9334f1ada5dc55.pdf) as part of the Swiss National Science Foundation(SNSF)' project: ”Formal Modelling of Qualitative Case Studies: An Application in Environmental Management”

- case based studies + ontologies
- we are applying ontologies to enable and facilitate the complete theory development
- Original textual data is 
  - annotated with ontologies 
    - information is retrieved (from these ontologies) by different ways for 
      - learning
      - inferring 
      - proposing

### grounded theory approach

- grounded theory approach

- acquisition and analysis of nonstandardised data

- the starting point is the data, which is marked by a series of codes which are then grouped together into concepts in order to reduce the dimensionality. These concepts are again grouped together to form categories which are finally used to build a theory
- in computer science an ontology is an explicit, formal specification of a shared conceptualisation in a domain of interest, where formal implies that the ontology should be machine-readable and shared so that it is accepted by a group or community

- Mostly, they build upon a hierarchical backbone and can be separated into
two levels: upper level ontologies (which describe the most general entities, contain very generic specifications and serve as a foundation for specialisation) and domain ontologies (which aim at describing a subject domain and where entities and relations of a specific domain are sometimes expressed directly in the texts belonging to it).


### Ontologies

- Ontology learning is concerned with knowledge discovery in different data sources and with its representation through an ontological structure

- two important aspects in ontology learning:
  - availability of prior knowledge — if knowledge exists, it must be used to create a first version of the ontology, which is then extended (semi-)automatically through learning procedures
  - type of input — according to its nature, input data is classified as structured data, semi-structured data (dictionaries, user tags [Benz and Hotho, 2007]) and unstructured data


### stages of the ontology learning process

1. Annotation - The marked sections of the primary documents are coded (labelled) by the users, according to the constraints imposed by the project and reference ontologies. More than one label can be used to tag a piece of
text (considered as an annotated document).

2. Term extraction - Each document of the corpus of annotated documents is treated as a bag-of-words. Stopwords are detected using simple, language independent statistical techniques and are then removed.

3. Feature vector creation - For each document d, the vector
(wd, ld) is created. Two matrices, one recording the frequency of each term in each document, and the other recording the frequency of each label in each document, are calculated and used as input for the label-topic model.

4. Topic generation - The number of topics (K) is fixed (but approaches using a variable number of topics may also be considered) and a generative probabilistic model is applied to model the correspondence between the documents and the labels.

5. Tags analysis - The possible relations between labels, seen as distributions over topics, are estimated using different divergence measures. The considered relations are Subordinate (or hypernym-hyponym relation),
Merge (or synonymous relation) and Keep. The divergence measures are calculated based on the KLdivergence or on the conditional independence.

6. Taxonomy construction - The hierarchical structure of the tags (codes) is constructed by applying different operations, such as merging two similar tags or creating the hypernym relation between two tags. In this hierarchy, the result of a minimising or a keep operation is always a virtual concept (tag). The resulting taxonomy must be created by minimising the information loss.


### implementation

- PDF tool
  - Profile and project management
    - each active instance in the system is located in a scope characterised by its owner and the containing project
  - Quotation
    - Users are able to choose some of the words, sentences or paragraphs from the primary document as a quotation. Each quotation contains as information its text, creation and modification time and date and the text size.
  - Coding
    - once a user has selected some quotations from the document, he can add codes to the quotations as tags
  - Code Search
  - Code Family
- Ontology manager
- Inference Engine
  - forward chaining, backward chaining and hybrid chaining
  - we can learn rules and ontologies in order to generate new facts
  - The results of the inference process can be used in order to make propositions or they can be used by the exporting tool.
- Proposition System
  - carry out ontology learning and exploit inference to provide extended
functionalities for qualitative case studies
  - Once some codes are given by the users manually, they should be able to get proposition according to the manual coding in an automatic way
  - the system can propose codes which appear together with a given code in other quotations
  - other codes from the same code family as a given code can be proposed
  - if the quotation itself contains some key words which are of interest, they are also proposed
  - data mining algorithms are applied to the data in our system
- Export and Visualisation
  - In qualitative research programs it is often important to be able to export the collected data to allow further analysis e.g. in statistical tools
  - In the standard GT approach this is difficult to realise as codes, concepts, categories and theories are stored in different places.
  - The ontology approach overcomes this difficulty because all the information is stored in one single system and in a common format
  - an export mechanism based on ontological inference. This is provided by using the OWL query language which will allow a user to specify dynamically which elements of the ontology he wants to export
  - The data is exported in a portable spread sheet format in order to ensure an easy interoperability with other analysis tools
  - Another form of export is to visualise the existing knowledge. For instance, users of the system can give certain ratings to the quotations and codes in each page. They will then be visualised in the form of a rating distribution over the whole document in terms of page numbers
  -  The full mark of the rating can be modified in the configuration file of the system.


### other notes


- the field of environment contains a large group of concepts with multiple
branches. Each of them have influence on each other, either in an implicit or explicit way. 
- The existing way, like relational database, is not sufficient to represent this kind of characteristics.
- Also, the phenomenon of environmental topics are often resulted by chains of factors. With the reasoning mechanisms of ontologies, the analysis to these processes is more effective. 
- At the same time, different forms of reports and outputs are demanded by the experts for cooperative or conclusive purpose. The query and export capacity of ontologies fits well these utilities.


---

- dat protocol


grant-funded, 
open-source, 
decentralized  tool


https://pdfs.semanticscholar.org/0ffc/41bb8e06faee4ed49f0b4b9334f1ada5dc55.pdf




---
