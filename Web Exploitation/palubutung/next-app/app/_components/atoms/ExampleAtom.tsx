interface ExampleAtomProps {
  // the props type goes here
  exampleProp: string; // name: type;
  exampleProp2: number; // name: type;
}

/***
 * Atom components are the smallest components and should only contain
 * the most basic HTML elements. They should not contain any logic or
 * state. They should be used to build molecules and organisms.
 */
export default function ExampleAtom(props: ExampleAtomProps) {
  return <div className="px-10">ExampleAtom</div>;
}
