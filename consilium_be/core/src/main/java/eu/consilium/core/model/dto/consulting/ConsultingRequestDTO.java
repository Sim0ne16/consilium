package eu.consilium.core.model.dto.consulting;

import eu.consilium.core.model.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultingRequestDTO {
    private Long id;
    private UserDTO requester;
    private UserDTO consultant;
    private String category;
    private String description;
    private String status;
    private LocalDateTime createdAt;
}