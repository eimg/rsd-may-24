import { ListItem, ListItemText, IconButton, Icon, } from "@mui/material";

import {
    SquareOutlined as CheckBoxIcon,
	CheckBox as DoneIcon,
	Delete as DeleteIcon,
    Edit as EditIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function Item({ item, remove, toggle }) {
	return (
		<ListItem>
			{item.done ? (
				<IconButton onClick={() => toggle(item._id)}>
					<DoneIcon color="success" />
				</IconButton>
			) : (
				<IconButton onClick={() => toggle(item._id)}>
					<CheckBoxIcon />
				</IconButton>
			)}

			<ListItemText primary={item.name} />

			<Link to={`/edit/${item._id}`}>
                <IconButton>
                    <EditIcon />
                </IconButton>
            </Link>

			<IconButton onClick={() => remove(item._id)}>
				<DeleteIcon color="error" />
			</IconButton>
		</ListItem>
	);
}
