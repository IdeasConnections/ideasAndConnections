import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "react-bootstrap";
import "./Connections.css";
import { useUserAuth } from "../../../../context/UserAuthContext";
import { toast, ToastContainer } from "react-toastify";
import defaultProfile from "../../../../assets/profile.png";

const Connections = () => {
  const { getAllUsers, addConnection, user, getConnection } = useUserAuth();
  const [usersList, setUsersList] = useState([]);
  const [connectionsList, setconnectionsList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers(user.uid, setUsersList);
        console.log("the all users", allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const getConnections = async () => {
      try {
        const allConnections = await getConnection(
          user.uid,
          setconnectionsList
        );
        console.log(connectionsList, "All connections");
      } catch (error) {
        console.log("Error fetching connection:");
      }
    };
    fetchUsers();
    getConnections();
  }, [getAllUsers, getConnection]);

  const getCurrentUser = (id, status) => {
    // Ensure user is available before calling addConnection
    if (user) {
      addConnection(user.uid, id, status);
      toast.success("Connection added");
    } else {
      console.error("User not available");
    }
  };

  return (
    <>
      <div className="connections-card-container d-flex flex-column  align-items-center ">
        <Card className={`connections`}>
          <Card.Body>
            <CardTitle>Your request</CardTitle>
            <ul>
              {connectionsList.map((connection) =>
                connection?.reqconnection?.map((user) => (
                  <li key={user.userId} className="connection-item">
                    <div className="row">
                      <div className="connection-name col-10">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          <img
                            src={user?.name?.imageLink || defaultProfile}
                            className="conn-img"
                          />
                          {user?.name?.firstName && user?.name?.lastName ? (
                            <>
                              {user?.name?.firstName} {user?.name?.lastName}
                            </>
                          ) : (
                            <>{user?.name?.displayName}</>
                          )}
                        </div>
                        <p>{user?.name?.headline}</p>
                      </div>
                      <div className="col mr-2">
                        <div className="row">
                          <button className="connect-button col ">
                            {user?.flag}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </Card.Body>
        </Card>
      </div>
      <div className="connections-card-container d-flex flex-column justify-content-center align-items-center flex ">
        <Card className={`connections`}>
          <CardBody>
            <CardTitle>Invitations</CardTitle>
            <div>
              <ul>
                {connectionsList.map((connection) =>
                  connection?.recvconnection?.map((user) => (
                    <li key={user.userId} className="connection-item">
                      <div className="row">
                        <div className="connection-name col-10">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                          >
                            <img
                              src={user.name.imageLink || defaultProfile}
                              className="conn-img"
                            />
                            {user.name.firstName && user.name.lastName ? (
                              <>
                                {user.name.firstName} {user.name.lastName}
                              </>
                            ) : (
                              <>{user.name.displayName}</>
                            )}
                          </div>
                          <p>{user.name.headline}</p>
                        </div>
                        <div className="col mr-2">
                          <div className="row">
                            <button
                              className="accept-button col"
                              onClick={() => {
                                getCurrentUser(user.userId, "Accept");
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="ignore-button col"
                              onClick={() => {
                                getCurrentUser(user.userId, "Ignore");
                              }}
                            >
                              Ignore
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="connections-card-container d-flex flex-column justify-content-center align-items-center flex ">
        <Card className={`connections`}>
          <Card.Body>
            <CardTitle>People you may know</CardTitle>
            <ul>
              {usersList
                .filter((users) => users.id !== user?.uid)
                .map((users) => (
                  <li key={users.id} className="connection-item">
                    <div className="row">
                      <div className="connection-name col-10">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          <img
                            src={users.imageLink || defaultProfile}
                            className="conn-img"
                          />
                          {users.firstName && users.lastName ? (
                            <>
                              {users.firstName} {users.lastName}
                            </>
                          ) : (
                            <>{users.displayName}</>
                          )}
                        </div>

                        <p>{users.headline}</p>
                      </div>
                      <div className="col mr-2">
                        <div className="row">
                          <button
                            className="connect-button "
                            onClick={() => {
                              getCurrentUser(users.id, "Pending");
                            }}
                          >
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </Card.Body>
        </Card>
      </div>

      <ToastContainer />
    </>
  );
};

export default Connections;
