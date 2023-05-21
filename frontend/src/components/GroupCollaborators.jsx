const GroupCollaborators = ({ collaborators }) => {
    return (
        <div className="flex mt-2 -space-x-4">
            {collaborators.map((item) => (
                <img
                    className="w-10 h-10 border border-white rounded-full dark:border-gray-800"
                    src="profile.jpg"
                    alt={item.name}
                    title={item.name}
                    key={item._id}
                />
            ))}
        </div>
    );
};

export default GroupCollaborators;
