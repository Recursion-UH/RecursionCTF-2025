interface ExampleOrganismProps {
  // the props type goes here
  exampleProp: string; // name: type;
  exampleProp2: number; // name: type;
}

/***
 * Organism components are the largest components and they usually contain molecules and atoms
 * They tend to be something that can't be broken down into smaller components
 */
export default function ExampleOrganism(props: ExampleOrganismProps) {
  return <div>ExampleOrganism</div>;
}
