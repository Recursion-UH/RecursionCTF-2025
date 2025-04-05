interface ExampleMoleculeProps {
  // the props type goes here
  exampleProp: string; // name: type;
  exampleProp2: number; // name: type;
}

/***
 * Molecule components are the second smallest components and they usually contain atoms
 * They should only include the minimal amount of logic and state necessary to perform their intended function.
 * Example: card component that uses button (atom) and label (atom)
 */
export default function ExampleMolecule(props: ExampleMoleculeProps) {
  return <div>ExampleMolecule</div>;
}
