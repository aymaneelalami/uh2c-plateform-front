interface EntityFormWithFieldsProps {
    entity?: EntityDetails; // The entity prop is optional to support creating new entities
    onEntitySubmit: (entity: EntityDetails) => void; // Callback to handle form submission
  }